import dotenv from "dotenv";
dotenv.config();
import pg from "pg";
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import crypto from "crypto";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

const { JWT_SECRET, BUCKET, SUPABASE_URL } = process.env;
if (!JWT_SECRET) {
  throw new Error("No JWT_SECRET in .env");
}
const isLocal = process.env.DATABASE_URL?.includes("localhost");

// подключение к БД берём из .env (то же, что использует migrate.js)
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isLocal ? false : { rejectUnauthorized: false },
});

const ALLOWED_TYPES = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 4 * 1024 * 1024 }, // 10 МБ
});

const s3 = new S3Client({
  region: process.env.REGION,
  endpoint: process.env.ENDPOINT,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.STORAGE_ACCESS_KEY,
    secretAccessKey: process.env.SECRET_STORAGE_ACCESS_KEY,
  },
});

/* ---------- helpers ---------- */

const publicUrl = (key) =>
  `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${key}`;

// из ссылки обратно достаём ключ файла в бакете
const keyFromUrl = (url) => {
  if (!url) return null;
  const marker = `/${BUCKET}/`;
  const i = url.indexOf(marker);
  return i === -1 ? null : url.slice(i + marker.length);
};

const deleteImage = async (key) => {
  if (!key) return;
  try {
    await s3.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
  } catch (err) {
    // не валим запрос, если картинка не удалилась
    console.error("Не удалось удалить файл из Supabase:", err.message);
  }
};

/* ---------- middleware ---------- */

// проверка JWT: кладёт данные пользователя в req.user
function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Нужна авторизация" });
  }
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res
      .status(401)
      .json({ success: false, message: "Сессия истекла, войдите заново" });
  }
}

// проверка роли (использовать после auth)
const requireRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ success: false, message: "Ошибка прав" });
  }
  next();
};

/* ---------- app ---------- */

const app = express();
app.use(express.json());
app.use(cors());

/* ----- auth ----- */

app.post("/register", async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({
      success: false,
      message: "Нужно указать email, пароль и роль",
    });
  }
  // роль можно выбрать только из двух, иначе можно зарегистрироваться "админом"
  if (!["buyer", "seller"].includes(role)) {
    return res.status(400).json({ success: false, message: "Неверная роль" });
  }
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Пароль должен быть не короче 6 символов",
    });
  }

  try {
    const hashPass = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING email, role",
      [email, hashPass, role],
    );
    res.status(201).json({ success: true, user: result.rows[0] });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ success: false, message: "Email занят" });
    }
    console.error(err);
    res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Введите email и пароль" });
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];
    const isMatch = user && (await bcrypt.compare(password, user.password));

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Неверный email или пароль" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ success: true, token, email: user.email, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
});

/* ----- products ----- */

// общий каталог (для всех)
app.get("/products", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
});

// товары текущего продавца
app.get("/my-products", auth, requireRole("seller"), async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products WHERE seller_id = $1 ORDER BY id DESC",
      [req.user.id],
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
});

app.get("/products/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ success: false, message: "Неверный id" });
  }

  try {
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Товар не найден" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
});

app.post(
  "/create",
  auth,
  requireRole("seller"),
  upload.single("image"),
  async (req, res) => {
    const { name, description, category, quantity, price, sku, session_id } =
      req.body;

    // серверная валидация (фронту доверять нельзя)
    if (!name?.trim() || name.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: "Название должно быть не меньше 10 символов",
      });
    }
    if (!description?.trim() || !sku?.trim() || !category) {
      return res
        .status(400)
        .json({ success: false, message: "Заполните все обязательные поля" });
    }
    if (!(Number(price) > 0) || !(Number(quantity) > 0)) {
      return res.status(400).json({
        success: false,
        message: "Цена и количество должны быть больше 0",
      });
    }
    // Session ID: 05 + 64 hex-символа (66 символов)
    if (!/^05[0-9a-fA-F]{64}$/.test(session_id?.trim() ?? "")) {
      return res.status(400).json({
        success: false,
        message: "Неверный Session ID: он должен начинаться с 05 и содержать 66 символов",
      });
    }
    if (req.file && !ALLOWED_TYPES[req.file.mimetype]) {
      return res
        .status(400)
        .json({ success: false, message: "Только JPEG, PNG, WEBP" });
    }

    let key = null;

    try {
      let imageUrl = null;

      if (req.file) {
        key = `${crypto.randomUUID()}.${ALLOWED_TYPES[req.file.mimetype]}`;
        await s3.send(
          new PutObjectCommand({
            Bucket: BUCKET,
            Key: key,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
          }),
        );
        imageUrl = publicUrl(key);
      }

      const result = await pool.query(
        `INSERT INTO products
           (name, price, description, sku, category_id, stock_quantity, image_url, seller_id, session_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        [
          name.trim(),
          price,
          description,
          sku.trim(),
          category,
          quantity,
          imageUrl,
          req.user.id,
          session_id.trim(),
        ],
      );

      res.status(201).json({
        success: true,
        message: "Товар добавлен",
        result: result.rows[0],
      });
    } catch (err) {
      console.error(err);
      await deleteImage(key); // не оставляем в хранилище "сироту"
      res
        .status(400)
        .json({ success: false, message: "Не удалось добавить товар" });
    }
  },
);

app.delete("/products/:id", auth, requireRole("seller"), async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ success: false, message: "Неверный id" });
  }

  try {
    // удаляем только СВОЙ товар
    const result = await pool.query(
      "DELETE FROM products WHERE id = $1 AND seller_id = $2 RETURNING image_url",
      [id, req.user.id],
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Товар не найден" });
    }

    await deleteImage(keyFromUrl(result.rows[0].image_url));
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
});

/* ----- ошибки multer (файл слишком большой и т.п.) ----- */
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    const message =
      err.code === "LIMIT_FILE_SIZE"
        ? "Файл больше 4 МБ"
        : "Ошибка загрузки файла";
    return res.status(400).json({ success: false, message });
  }
  console.error(err);
  res.status(500).json({ success: false, message: "Ошибка сервера" });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server started on ${PORT}`));
