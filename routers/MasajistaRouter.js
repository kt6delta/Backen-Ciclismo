const express = require('express');
const { crearUsuarioMasajista, perfilMasajista } = require('../controllers/UsuarioControllerMasajista');

const router = express.Router();

router.post('/usuarios/crearUsuarioMasajista', crearUsuarioMasajista);
router.post('/usuarios/perfilMasajista', perfilMasajista);

module.exports = router;
