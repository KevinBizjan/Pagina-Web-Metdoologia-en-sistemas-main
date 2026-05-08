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
    });
}

// Esperar a que la DB se inicialice (config/database.js lo hace al importar)
setTimeout(seed, 1000);
