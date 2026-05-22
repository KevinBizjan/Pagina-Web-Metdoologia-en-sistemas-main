const express = require('express');
const router = express.Router();
const serviciosController = require('../controllers/servicios.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Rutas protegidas
router.post('/comedor/asistencia', authMiddleware(['admin', 'docente']), serviciosController.registrarAsistenciaComedor);

router.get('/transporte/rutas', authMiddleware(['admin']), serviciosController.getRutas);
router.post('/transporte/asignar', authMiddleware(['admin']), serviciosController.asignarAlumnoTransporte);

router.post('/instalaciones/reservar', authMiddleware(['admin', 'docente']), serviciosController.reservarInstalacion);

router.post('/enfermeria/incidencia', authMiddleware(['admin', 'docente']), serviciosController.registrarIncidenciaEnfermeria);

module.exports = router;
