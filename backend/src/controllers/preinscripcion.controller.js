const db = require('../config/database');

exports.create = (req, res) => {
    const { 
        alumno_nombre, 
        alumno_dni,
        alumno_edad, 
        nivel, 
        turno, 
        tutor_nombre, 
        tutor_telefono, 
        tutor_email, 
        observaciones 
    } = req.body;

    if (!alumno_nombre || !alumno_dni || !alumno_edad || !nivel || !turno || !tutor_nombre || !tutor_telefono || !tutor_email) {
        return res.status(400).json({ message: 'Todos los campos obligatorios deben ser completados' });
    }

    const query = `INSERT INTO preinscripciones 
        (alumno_nombre, alumno_dni, alumno_edad, nivel, turno, tutor_nombre, tutor_telefono, tutor_email, observaciones) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    db.run(query, [alumno_nombre, alumno_dni, alumno_edad, nivel, turno, tutor_nombre, tutor_telefono, tutor_email, observaciones], function(err) {
        if (err) {
            return res.status(500).json({ message: 'Error al registrar la preinscripción', error: err.message });
        }
        res.status(201).json({ message: 'Preinscripción enviada con éxito', id: this.lastID });
    });
};

exports.getAll = (req, res) => {
    const query = `SELECT * FROM preinscripciones ORDER BY fecha DESC`;
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener las preinscripciones', error: err.message });
        }
        res.json(rows);
    });
};

exports.updateStatus = (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    const query = `UPDATE preinscripciones SET estado = ? WHERE id = ?`;
    db.run(query, [estado, id], function(err) {
        if (err) {
            return res.status(500).json({ message: 'Error al actualizar el estado' });
        }
        res.json({ message: 'Estado actualizado correctamente' });
    });
};
