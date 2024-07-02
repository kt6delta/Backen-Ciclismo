const express = require('express');
const { getEquipo, crearEquipo } = require('../controllers/EquipoController');

const router = express.Router();

router.get('/getEquipo', getEquipo);
router.post('/crearEquipo', crearEquipo);

module.exports = router;