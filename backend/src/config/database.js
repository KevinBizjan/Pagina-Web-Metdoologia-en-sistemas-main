const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const dbPath = path.resolve(__dirname, '../../', process.env.DATABASE_PATH || './database/database.sqlite');

// Asegurar que la carpeta database existe
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al conectar con SQLite:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
        initializeDatabase();
    }
});

function initializeDatabase() {
    db.serialize(() => {
        // Tabla de Usuarios
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            nombre TEXT NOT NULL,
            rol TEXT CHECK( rol IN ('admin', 'docente', 'alumno', 'padre') ) NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // Tabla de Preinscripciones
        db.run(`CREATE TABLE IF NOT EXISTS preinscripciones (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            alumno_nombre TEXT NOT NULL,
            alumno_edad INTEGER NOT NULL,
            nivel TEXT NOT NULL,
            turno TEXT NOT NULL,
            tutor_nombre TEXT NOT NULL,
            tutor_telefono TEXT NOT NULL,
            tutor_email TEXT NOT NULL,
            observaciones TEXT,
            estado TEXT DEFAULT 'pendiente',
            fecha DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
    });
}

module.exports = db;
