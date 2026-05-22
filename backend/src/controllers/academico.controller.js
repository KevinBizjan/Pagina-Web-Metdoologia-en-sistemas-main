const db = require('../config/database');

// --- NIVELES ---
exports.getNiveles = (req, res) => {
    db.all("SELECT * FROM niveles", [], (err, rows) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(rows);
    });
};

// --- AULAS ---
exports.getAulas = (req, res) => {
    db.all("SELECT * FROM aulas", [], (err, rows) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(rows);
    });
};

exports.createAula = (req, res) => {
    const { nombre, capacidad } = req.body;
    if (!nombre || !capacidad) return res.status(400).json({ message: "Campos obligatorios" });
    db.run("INSERT INTO aulas (nombre, capacidad) VALUES (?, ?)", [nombre, capacidad], function(err) {
        if (err) return res.status(500).json({ message: err.message });
        res.status(201).json({ id: this.lastID });
    });
};

// --- CURSOS ---
exports.getCursos = (req, res) => {
    const query = `
        SELECT cursos.*, niveles.nombre as nivel_nombre 
        FROM cursos 
        JOIN niveles ON cursos.nivel_id = niveles.id
    `;
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(rows);
    });
};

exports.createCurso = (req, res) => {
    const { nivel_id, division, cupo } = req.body;
    if (!nivel_id || !division || !cupo) return res.status(400).json({ message: "Campos obligatorios" });
    db.run("INSERT INTO cursos (nivel_id, division, cupo) VALUES (?, ?, ?)", [nivel_id, division, cupo], function(err) {
        if (err) return res.status(500).json({ message: err.message });
        res.status(201).json({ id: this.lastID });
    });
};

// --- ALUMNOS (Legajos) ---
exports.getAlumnos = (req, res) => {
    const query = `
        SELECT alumnos.*, cursos.division, niveles.nombre as nivel_nombre
        FROM alumnos 
        LEFT JOIN cursos ON alumnos.curso_id = cursos.id
        LEFT JOIN niveles ON cursos.nivel_id = niveles.id
    `;
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(rows);
    });
};

exports.createAlumno = (req, res) => {
    const { nombre, apellido, dni, fecha_nacimiento, curso_id } = req.body;
    if (!nombre || !apellido || !dni || !fecha_nacimiento) {
        return res.status(400).json({ message: "Nombre, Apellido, DNI y Fecha de Nacimiento son obligatorios" });
    }

    // Validar cupo si se asigna curso
    if (curso_id) {
        db.get("SELECT cupo, (SELECT COUNT(*) FROM alumnos WHERE curso_id = ?) as inscriptos FROM cursos WHERE id = ?", [curso_id, curso_id], (err, curso) => {
            if (err) return res.status(500).json({ message: err.message });
            if (!curso) return res.status(404).json({ message: "Curso no encontrado" });
            if (curso.inscriptos >= curso.cupo) return res.status(400).json({ message: "No hay vacantes disponibles en este curso" });
            
            saveAlumno();
        });
    } else {
        saveAlumno();
    }

    function saveAlumno() {
        const query = "INSERT INTO alumnos (nombre, apellido, dni, fecha_nacimiento, curso_id) VALUES (?, ?, ?, ?, ?)";
        db.run(query, [nombre, apellido, dni, fecha_nacimiento, curso_id], function(err) {
            if (err) return res.status(500).json({ message: err.message });
            res.status(201).json({ id: this.lastID });
        });
    }
};

// --- ASISTENCIA & CALIFICACIONES (Docente) ---
exports.registrarAsistencia = (req, res) => {
    const { alumno_id, fecha, estado } = req.body;
    if (!alumno_id || !estado) return res.status(400).json({ message: "Datos incompletos" });
    db.run("INSERT INTO asistencias (alumno_id, fecha, estado) VALUES (?, ?, ?)", [alumno_id, fecha, estado], function(err) {
        if (err) return res.status(500).json({ message: err.message });
        res.status(201).json({ id: this.lastID });
    });
};

exports.cargarCalificacion = (req, res) => {
    const { alumno_id, materia_id, nota, trimestre } = req.body;
    const notaNum = parseInt(nota);
    if (isNaN(notaNum) || notaNum < 1 || notaNum > 10) {
        return res.status(400).json({ message: "La nota debe ser un número entre 1 y 10" });
    }
    db.run("INSERT INTO calificaciones (alumno_id, materia_id, nota, trimestre) VALUES (?, ?, ?, ?)", [alumno_id, materia_id, notaNum, trimestre], function(err) {
        if (err) return res.status(500).json({ message: err.message });
        res.status(201).json({ id: this.lastID });
    });
};
