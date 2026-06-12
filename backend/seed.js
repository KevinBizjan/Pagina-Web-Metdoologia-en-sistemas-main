const bcrypt = require('bcryptjs');
const db = require('./src/config/database');

async function seed() {
    const salt = await bcrypt.genSalt(10);
    const users = [
        ['admin', await bcrypt.hash('admin123', salt), 'Administrador', 'admin'],
        ['docente', await bcrypt.hash('docente123', salt), 'Juan Docente', 'docente'],
        ['alumno', await bcrypt.hash('alumno123', salt), 'Pepe Alumno', 'alumno'],
        ['padre', await bcrypt.hash('padre123', salt), 'Carlos Padre', 'padre']
    ];

    db.serialize(() => {
        const stmt = db.prepare(`INSERT OR IGNORE INTO users (username, password, nombre, rol) VALUES (?, ?, ?, ?)`);
        users.forEach(user => {
            stmt.run(user);
        });
        stmt.finalize();
        console.log('Usuarios de prueba creados.');

        // Niveles
        const niveles = [['Inicial'], ['Primario'], ['Secundario']];
        const stmtNiv = db.prepare(`INSERT OR IGNORE INTO niveles (nombre) VALUES (?)`);
        niveles.forEach(n => stmtNiv.run(n));
        stmtNiv.finalize();

        // Aulas
        const aulas = [['Aula 101', 30], ['Aula 102', 30], ['Laboratorio de Ciencias', 20]];
        const stmtAul = db.prepare(`INSERT OR IGNORE INTO aulas (nombre, capacidad) VALUES (?, ?)`);
        aulas.forEach(a => stmtAul.run(a));
        stmtAul.finalize();

        // Instalaciones agendables (pileta, gimnasio, laboratorios).
        // Se siembran solo si la tabla está vacía para no duplicar en re-ejecuciones.
        db.get("SELECT COUNT(*) as count FROM instalaciones", (err, row) => {
            if (!err && row && row.count === 0) {
                const instalaciones = [
                    ['Pileta', 'Pileta climatizada para clases de natación'],
                    ['Gimnasio', 'Gimnasio cubierto para educación física y deportes'],
                    ['Laboratorio de Ciencias', 'Laboratorio equipado para física, química y biología'],
                    ['Laboratorio de Informática', 'Sala de computación con equipamiento actualizado']
                ];
                const stmtInst = db.prepare(`INSERT INTO instalaciones (nombre, descripcion) VALUES (?, ?)`);
                instalaciones.forEach(i => stmtInst.run(i));
                stmtInst.finalize();
                console.log('Instalaciones iniciales creadas.');
            }
        });

        console.log('Datos académicos iniciales creados.');
    });
}

// Esperar a que la DB se inicialice (config/database.js lo hace al importar)
setTimeout(seed, 1000);
