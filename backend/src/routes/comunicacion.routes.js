const express = require('express');
const router = express.Router();
const comunicacionController = require('../controllers/comunicacion.controller');
const reportesController = require('../controllers/reportes.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Rutas protegidas
router.get('/notificaciones', authMiddleware(['admin', 'docente', 'alumno', 'padre']), comunicacionController.getNotificaciones);
router.post('/notificaciones', authMiddleware(['admin']), comunicacionController.crearNotificacion);

router.get('/actividades-extra', comunicacionController.getActividadesExtra);
router.post('/actividades-extra/inscribir', authMiddleware(['alumno', 'padre']), comunicacionController.inscribirActividad);

router.get('/reportes/stats', authMiddleware(['admin']), reportesController.getEstadisticasGenerales);

module.exports = router;
