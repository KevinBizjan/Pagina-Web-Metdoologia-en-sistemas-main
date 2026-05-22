const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/database');
require('dotenv').config();

exports.register = async (req, res) => {
    const { username, password, nombre, rol } = req.body;

    if (!username || !password || !nombre || !rol) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `INSERT INTO users (username, password, nombre, rol) VALUES (?, ?, ?, ?)`;
    db.run(query, [username, hashedPassword, nombre, rol], function(err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(400).json({ message: 'El nombre de usuario ya existe' });
            }
            return res.status(500).json({ message: 'Error al registrar usuario', error: err.message });
        }
        res.status(201).json({ message: 'Usuario registrado exitosamente', userId: this.lastID });
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Usuario y contraseña requeridos' });
    }

    const query = `SELECT * FROM users WHERE username = ?`;
    db.get(query, [username], async (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Error en el servidor', error: err.message });
        }
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username, rol: user.rol },
            process.env.JWT_SECRET,
            { expiresIn: '30m' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                nombre: user.nombre,
                rol: user.rol
            }
        });
    });
};

exports.getMe = (req, res) => {
    const query = `SELECT id, username, nombre, rol, created_at FROM users WHERE id = ?`;
    db.get(query, [req.user.id], (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener datos del usuario' });
        }
        res.json(user);
    });
};
