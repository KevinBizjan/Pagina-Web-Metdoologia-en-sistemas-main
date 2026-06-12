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
    const { nombre, apellido, dni, fecha_nacimiento, curso_id, tutor_id } = req.body;
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
        const query = "INSERT INTO alumnos (nombre, apellido, dni, fecha_nacimiento, curso_id, tutor_id) VALUES (?, ?, ?, ?, ?, ?)";
        db.run(query, [nombre, apellido, dni, fecha_nacimiento, curso_id || null, tutor_id || null], function(err) {
            if (err) return res.status(500).json({ message: err.message });
            res.status(201).json({ id: this.lastID });
        });
    }
};

exports.updateAlumno = (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, dni, fecha_nacimiento, curso_id, tutor_id } = req.body;

    const query = `
        UPDATE alumnos
        SET nombre = ?, apellido = ?, dni = ?, fecha_nacimiento = ?, curso_id = ?, tutor_id = ?
        WHERE id = ?
    `;
    db.run(query, [nombre, apellido, dni, fecha_nacimiento, curso_id || null, tutor_id || null, id], function(err) {
        if (err) return res.status(500).json({ message: err.message });
        if (this.changes === 0) return res.status(404).json({ message: "Alumno no encontrado" });
        res.json({ message: "Alumno actualizado correctamente" });
    });
};

// --- MATERIAS ---
exports.getMaterias = (req, res) => {
    db.all("SELECT * FROM materias ORDER BY nombre", [], (err, rows) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(rows);
    });
};

// --- MIS HIJOS (para rol padre) ---
exports.getMisHijos = (req, res) => {
    const query = `
        SELECT alumnos.*, cursos.division, niveles.nombre as nivel_nombre
        FROM alumnos
        LEFT JOIN cursos ON alumnos.curso_id = cursos.id
        LEFT JOIN niveles ON cursos.nivel_id = niveles.id
        WHERE alumnos.tutor_id = ?
    `;
    db.all(query, [req.user.id], (err, rows) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(rows);
    });
};

// --- VINCULACIÓN DE HIJOS (para rol padre) ---

// Lista los alumnos que todavía no tienen un tutor asignado,
// para que el padre pueda elegir cuál vincular a su cuenta.
exports.getAlumnosDisponibles = (req, res) => {
    const query = `
        SELECT id, nombre, apellido, dni
        FROM alumnos
        WHERE tutor_id IS NULL
        ORDER BY apellido, nombre
    `;
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(rows);
    });
};

// Vincula un alumno disponible a la cuenta del padre que hace la solicitud.
exports.vincularHijo = (req, res) => {
    const alumno_id = parseInt(req.body.alumno_id);
    if (!alumno_id) return res.status(400).json({ message: "Debe seleccionar un alumno" });

    // Solo permite vincular si el alumno aún no tiene tutor.
    db.run(
        "UPDATE alumnos SET tutor_id = ? WHERE id = ? AND tutor_id IS NULL",
        [req.user.id, alumno_id],
        function(err) {
            if (err) return res.status(500).json({ message: err.message });
            if (this.changes === 0) {
                return res.status(400).json({ message: "El alumno no existe o ya tiene un tutor asignado" });
            }
            res.json({ message: "Alumno vinculado correctamente" });
        }
    );
};

// Desvincula un hijo de la cuenta del padre (solo si le pertenece).
exports.desvincularHijo = (req, res) => {
    const { id } = req.params;
    db.run(
        "UPDATE alumnos SET tutor_id = NULL WHERE id = ? AND tutor_id = ?",
        [id, req.user.id],
        function(err) {
            if (err) return res.status(500).json({ message: err.message });
            if (this.changes === 0) {
                return res.status(404).json({ message: "No se encontró el alumno vinculado a su cuenta" });
            }
            res.json({ message: "Alumno desvinculado correctamente" });
        }
    );
};

exports.deleteAlumno = (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM alumnos WHERE id = ?", [id], function(err) {
        if (err) return res.status(500).json({ message: err.message });
        if (this.changes === 0) return res.status(404).json({ message: "Alumno no encontrado" });
        res.json({ message: "Alumno eliminado correctamente" });
    });
};

exports.deleteAula = (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM aulas WHERE id = ?", [id], function(err) {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ message: "Aula eliminada" });
    });
};

exports.deleteCurso = (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM cursos WHERE id = ?", [id], function(err) {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ message: "Curso eliminado" });
    });
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
