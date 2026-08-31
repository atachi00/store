import dotenv from 'dotenv'
dotenv.config()
import pg from 'pg'
import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const { Pool } = pg
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'market',
    password: '1',
    port: 5432
})

function verifyUser(req) {
    const authHeader = req.headers.authorization
    const token = authHeader?.split(' ')[1]
    if (!token) {
        throw new Error('Token is empty')
    }
    return jwt.verify(token, process.env.JWT_SECRET)
}

function oauthMiddleware() {
    
}


const app = express()
app.use(express.json())
app.use(cors())


app.post('/create', async (req, res) => {
    const oauthHeader = req.headers.authorization
    const token = oauthHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(400).json({message: 'Bad Request'})
    }

    
     try {
        const user = jwt.verify(token, process.env.JWT_SECRET) 
        if (user.role !== 'seller') {
            return res.status(403).json({message: 'Ошибка прав'})
        }

        const {name, description, category, quantity, price, sku} = req.body
        const result = await pool.query('INSERT INTO products (name, price, description, sku, category_id, stock_quantity) VALUES ($1, $2, $3, $4, $5, $6)', 
        [name, price, description, sku, category, quantity])
        res.status(201).json({success: true, message: 'Товар добавлен', result: result.rows[0]})
    } catch (error) {
        res.status(400).json({success: false, message: 'Не удалось добавить товар'})
        throw error
    }

   
})

app.get('/products', async (req,res) => {
    const result = await pool.query('SELECT * FROM products') //рендер карточек продуктов
    res.json(result.rows)
})

    app.post('/register', async (req, res) => {          //попытка зарегистрироваться
    const {email, password, role} = req.body

    if (!email || !password || !role) {              // если не заполнены поля
      return res.status(400).json({
        success: false,
        message: 'Нужно указать email, password и role'
      });
    }
    try{
        const hashPass = await bcrypt.hash(password, 10)         //хэширование пароля
        const result = await pool.query('INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING email, role', //вставка в БД
        [email, hashPass, role]
        )
        res.status(201).json({success:true, user: result.rows[0]})
    } catch (err) {
        if (err.code ==='23505'){
            return res.status(409).json({success:false, message: 'Email занят'})
        } 
        throw err
    }
})

app.post('/login', async (req, res) => {                  //запрос на логин
    const {email, password} = req.body                      //поля с инпутов
    const result = await pool.query('SELECT * FROM users WHERE email = $1',[email])    

    if(result.rows.length === 0) {       // если пользователь не найден
        return res.json({
            status: false,
            message: 'Invalid email or pass'
        })
    }
    const user = result.rows[0]             

    const isMatch = await bcrypt.compare(password, user.password)       //проверка пароля



    if (!isMatch) {
        return res.json({
            status: false,
            message: 'Invalid email or pass'                            // если не совпал пароль 
        })
    }   
    const secret = process.env.JWT_SECRET
    if (!secret) {
        throw new Error('No JWT_SECRET in local variables')
    }

    const token = jwt.sign(                                               //даем сессионный токен
        {id: user.id, role: user.role},                                   //в полезной нагрузке - данные о пользователе
        secret,                                                           
        {expiresIn: '1h'}                                                  //время действия
    )

    res.json({                                                              //возвращаем ответ с токеном клиенту
      success: true,
      token,
      email: user.email,
      role: user.role
    })
})

app.post('/products', async (req, res) => {
    const {name, price, description} = req.body
    const result = await pool.query(
        'INSERT INTO products (name, price, description) VALUES ($1, $2, $3) RETURNING *', 
        [name,price,description]
    )

    res.json(result.rows[0])
})

app.delete('/products/:id', async (req,res) => {
    const {id} = req.params
    await pool.query('DELETE FROM products WHERE id = $1', [id])
    res.json({success: true})
})

app.get('/products/:id', async (req,res) => {
    const {id} = req.params
    const response = await pool.query('SELECT * FROM products WHERE id = $1', [id])
    res.json(response.rows[0])
})



app.listen(3000,() => console.log('server started'))