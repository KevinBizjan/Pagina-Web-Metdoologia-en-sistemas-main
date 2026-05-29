const express = require('express');
const router = express.Router();
const academicoController = require('../controllers/academico.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Rutas protegidas por rol (Admin y Docente)
router.get('/niveles', academicoController.getNiveles);
router.get('/aulas', academicoController.getAulas);
router.post('/aulas', authMiddleware(['admin']), academicoController.createAula);
router.delete('/aulas/:id', authMiddleware(['admin']), academicoController.deleteAula);

router.get('/cursos', academicoController.getCursos);
router.post('/cursos', authMiddleware(['admin']), academicoController.createCurso);
router.delete('/cursos/:id', authMiddleware(['admin']), academicoController.deleteCurso);

router.get('/alumnos', authMiddleware(['admin', 'docente']), academicoController.getAlumnos);
router.post('/alumnos', authMiddleware(['admin']), academicoController.createAlumno);
router.put('/alumnos/:id', authMiddleware(['admin']), academicoController.updateAlumno);
router.delete('/alumnos/:id', authMiddleware(['admin']), academicoController.deleteAlumno);

router.post('/asistencias', authMiddleware(['docente']), academicoController.registrarAsistencia);
router.post('/calificaciones', authMiddleware(['docente']), academicoController.cargarCalificacion);

module.exports = router;
