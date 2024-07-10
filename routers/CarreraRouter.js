const express = require('express');
const { crearCarrera } = require('../controllers/CarreraController');

const router = express.Router();

//router.get('/carrera', getUsuario);
router.post('/carrera/crearCarrera', crearCarrera);

module.exports = router;