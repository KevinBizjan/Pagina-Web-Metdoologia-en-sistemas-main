const db = require('../config/database');

exports.getEstadisticasGenerales = (req, res) => {
    const stats = {};
    
    db.serialize(() => {
        db.get("SELECT COUNT(*) as count FROM alumnos", (err, row) => {
            stats.total_alumnos = row.count;
        });
        
        db.get("SELECT SUM(saldo_pendiente) as total FROM saldos_alumnos", (err, row) => {
            stats.deuda_total = row.total || 0;
        });
        
        db.get("SELECT COUNT(*) as count FROM preinscripciones WHERE estado = 'pendiente'", (err, row) => {
            stats.preinscripciones_pendientes = row.count;
        });
        
        db.get("SELECT COUNT(*) as count FROM personal WHERE tipo = 'Docente'", (err, row) => {
            stats.total_docentes = row.count;
            res.json(stats);
        });
    });
};
