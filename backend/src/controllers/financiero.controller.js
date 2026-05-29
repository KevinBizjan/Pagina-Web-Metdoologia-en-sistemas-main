const db = require('../config/database');

// --- PERSONAL ---
exports.getPersonal = (req, res) => {
    db.all("SELECT * FROM personal", [], (err, rows) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(rows);
    });
};

exports.createPersonal = (req, res) => {
    const { nombre, apellido, dni, tipo, email } = req.body;
    if (!nombre || !apellido || !dni || !tipo) return res.status(400).json({ message: "Campos obligatorios" });
    db.run("INSERT INTO personal (nombre, apellido, dni, tipo, email) VALUES (?, ?, ?, ?, ?)", [nombre, apellido, dni, tipo, email], function(err) {
        if (err) return res.status(500).json({ message: err.message });
        res.status(201).json({ id: this.lastID });
    });
};

exports.deletePersonal = (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM personal WHERE id = ?", [id], function(err) {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ message: "Personal eliminado" });
    });
};

// --- CUOTAS CONFIG ---
exports.getCuotasConfig = (req, res) => {
    const query = `
        SELECT cc.*, n.nombre as nivel_nombre 
        FROM cuotas_config cc
        JOIN niveles n ON cc.nivel_id = n.id
    `;
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(rows);
    });
};

exports.createCuotaConfig = (req, res) => {
    const { nivel_id, monto, mes, anio, vencimiento } = req.body;
    const montoNum = parseFloat(monto);
    if (isNaN(montoNum) || montoNum <= 0) return res.status(400).json({ message: "El monto debe ser un decimal mayor a 0" });
    
    db.run("INSERT INTO cuotas_config (nivel_id, monto, mes, anio, vencimiento) VALUES (?, ?, ?, ?, ?)", [nivel_id, montoNum, mes, anio, vencimiento], function(err) {
        if (err) return res.status(500).json({ message: err.message });
        res.status(201).json({ id: this.lastID });
    });
};

exports.deleteCuotaConfig = (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM cuotas_config WHERE id = ?", [id], function(err) {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ message: "Configuración de cuota eliminada" });
    });
};

// --- PAGOS & DEUDA ---
exports.registrarPago = (req, res) => {
    const { alumno_id, cuota_id, monto_pagado, metodo_pago } = req.body;
    if (!alumno_id || !monto_pagado) return res.status(400).json({ message: "Datos incompletos" });

    db.serialize(() => {
        db.run("BEGIN TRANSACTION");

        const queryPago = "INSERT INTO pagos (alumno_id, cuota_id, monto_pagado, metodo_pago) VALUES (?, ?, ?, ?)";
        db.run(queryPago, [alumno_id, cuota_id, monto_pagado, metodo_pago], function(err) {
            if (err) {
                db.run("ROLLBACK");
                return res.status(500).json({ message: "Error al registrar el pago" });
            }

            // Actualizar deuda
            const queryDeuda = `
                INSERT INTO saldos_alumnos (alumno_id, saldo_pendiente) 
                VALUES (?, -?) 
                ON CONFLICT(alumno_id) DO UPDATE SET 
                saldo_pendiente = saldo_pendiente - ?, 
                ultima_actualizacion = CURRENT_TIMESTAMP
            `;
            db.run(queryDeuda, [alumno_id, monto_pagado, monto_pagado], function(err) {
                if (err) {
                    db.run("ROLLBACK");
                    return res.status(500).json({ message: "Error al actualizar la deuda" });
                }
                db.run("COMMIT");
                res.status(201).json({ message: "Pago registrado y saldo actualizado" });
            });
        });
    });
};

exports.getSaldoAlumno = (req, res) => {
    const { alumno_id } = req.params;
    db.get("SELECT * FROM saldos_alumnos WHERE alumno_id = ?", [alumno_id], (err, row) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(row || { saldo_pendiente: 0 });
    });
};
