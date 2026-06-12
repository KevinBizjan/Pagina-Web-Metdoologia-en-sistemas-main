const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/database');
require('dotenv').config();

// Registro de cuenta familiar (rol "padre").
// El usuario se registra con su correo y una contraseña. El correo se usa
// como nombre de usuario para iniciar sesión. Luego, desde su panel, podrá
// vincular el legajo de su hijo ya creado por la institución.
exports.registroFamiliar = async (req, res) => {
    const nombre = (req.body.nombre || '').trim().replace(/\s+/g, ' ');
    const email = (req.body.email || '').trim().toLowerCase();
    const password = req.body.password || '';

    // Validaciones básicas de entrada
    if (!nombre || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ message: 'El correo electrónico no es válido' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // El rol siempre es "padre": no se toma del cliente.
    const query = `INSERT INTO users (username, password, nombre, rol) VALUES (?, ?, ?, 'padre')`;
    db.run(query, [email, hashedPassword, nombre], function(err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(400).json({ message: 'Ya existe una cuenta con ese correo' });
            }
            return res.status(500).json({ message: 'Error al registrar usuario', error: err.message });
        }
        res.status(201).json({ message: 'Cuenta creada con éxito', userId: this.lastID });
    });
};

exports.login = (req, res) => {
    const username = (req.body.username || '').trim().toLowerCase();
    const { password } = req.body;

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

exports.getPadres = (req, res) => {
    db.all(`SELECT id, nombre, username FROM users WHERE rol = 'padre' ORDER BY nombre`, [], (err, rows) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(rows);
    });
};
