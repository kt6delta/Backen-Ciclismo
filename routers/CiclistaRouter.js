const express = require('express');
const { crearUsuarioCiclista, perfilCiclista } = require('../controllers/UsuarioControllerCiclista');

const router = express.Router();

router.post('/usuarios/crearUsuarioCiclista', crearUsuarioCiclista);
router.get('/usuarios/perfilCiclista', perfilCiclista);

module.exports = router;