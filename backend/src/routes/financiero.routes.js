const express = require('express');
const router = express.Router();
const financieroController = require('../controllers/financiero.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Rutas protegidas
router.get('/personal', authMiddleware(['admin']), financieroController.getPersonal);
router.post('/personal', authMiddleware(['admin']), financieroController.createPersonal);

router.get('/cuotas-config', authMiddleware(['admin']), financieroController.getCuotasConfig);
router.post('/cuotas-config', authMiddleware(['admin']), financieroController.createCuotaConfig);

router.post('/pagos', authMiddleware(['admin']), financieroController.registrarPago);
router.get('/saldo/:alumno_id', authMiddleware(['admin', 'padre']), financieroController.getSaldoAlumno);

module.exports = router;
