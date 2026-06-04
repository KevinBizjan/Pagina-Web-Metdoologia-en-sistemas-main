const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors()); // Permitir todos los orígenes para desarrollo local
app.use(express.json());
app.use(morgan('dev'));

// Rutas
const authRoutes = require('./routes/auth.routes');
const preinscripcionRoutes = require('./routes/preinscripcion.routes');

app.use('/api/auth', authRoutes);
app.use('/api/preinscripciones', preinscripcionRoutes);
app.use('/api/academico', require('./routes/academico.routes'));
app.use('/api/financiero', require('./routes/financiero.routes'));
app.use('/api/servicios', require('./routes/servicios.routes'));
app.use('/api/comunicacion', require('./routes/comunicacion.routes'));

// Rutas base (Placeholder)
app.get('/', (req, res) => {
    res.json({ message: 'API Educar para Transformar - Activa' });
});

module.exports = app;
