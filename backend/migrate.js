// migrate.js
import dotenv from 'dotenv';
dotenv.config();

import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Client } = pg;

async function runMigrations() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('✅ Connected to database');

    // Создаём таблицу для отслеживания миграций
    await client.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Получаем выполненные миграции
    const result = await client.query('SELECT name FROM migrations ORDER BY id');
    const executedMigrations = result.rows.map(row => row.name);

    // Читаем файлы миграций
    const migrationsDir = path.join(__dirname, 'migrations');
    const files = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();

    // Выполняем новые
    for (const file of files) {
      if (!executedMigrations.includes(file)) {
        console.log(`🔄 Running migration: ${file}`);
        
        const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
        await client.query(sql);
        
        await client.query(
          'INSERT INTO migrations (name) VALUES ($1)',
          [file]
        );
        
        console.log(`✅ Migration ${file} completed`);
      } else {
        console.log(`⏭️ Skipping ${file} (already executed)`);
      }
    }

    console.log('🎉 All migrations completed!');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigrations();