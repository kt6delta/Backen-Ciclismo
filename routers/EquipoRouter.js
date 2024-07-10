const express = require('express');
const { getEquipo, crearEquipo } = require('../controllers/EquipoController');

const router = express.Router();

router.get('/equipo', getEquipo);
router.post('/equipo/crear_equipo', crearEquipo);

module.exports = router;