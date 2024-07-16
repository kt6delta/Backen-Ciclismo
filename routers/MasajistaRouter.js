const express = require('express');
const {getMasajistas, crearUsuarioMasajista, perfilMasajista } = require('../controllers/UsuarioControllerMasajista');

const router = express.Router();

router.get('/usuarios/getMasajistas',getMasajistas);
router.post('/usuarios/crearUsuarioMasajista', crearUsuarioMasajista);
router.post('/usuarios/perfilMasajista', perfilMasajista);

module.exports = router;
