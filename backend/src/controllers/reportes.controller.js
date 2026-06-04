const db = require('../config/database');

exports.getEstadisticasGenerales = (req, res) => {
    const stats = {
        total_alumnos: 0,
        deuda_total: 0,
        preinscripciones_pendientes: 0,
        total_docentes: 0
    };

    db.serialize(() => {
        db.get("SELECT COUNT(*) as count FROM alumnos", (err, row) => {
            if (!err && row) stats.total_alumnos = row.count;
        });

        db.get("SELECT SUM(saldo_pendiente) as total FROM saldos_alumnos", (err, row) => {
            if (!err && row) stats.deuda_total = row.total || 0;
        });

        db.get("SELECT COUNT(*) as count FROM preinscripciones WHERE estado = 'pendiente'", (err, row) => {
            if (!err && row) stats.preinscripciones_pendientes = row.count;
        });

        db.get("SELECT COUNT(*) as count FROM personal WHERE tipo = 'Docente'", (err, row) => {
            if (!err && row) stats.total_docentes = row.count;
            res.json(stats);
        });
    });
};
