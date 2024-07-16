const express = require('express');
const {getCiclistas, crearUsuarioCiclista, perfilCiclista } = require('../controllers/UsuarioControllerCiclista');

const router = express.Router();

router.get('/usuarios/getCiclistas', getCiclistas);
router.post('/usuarios/crearUsuarioCiclista', crearUsuarioCiclista);
router.post('/usuarios/perfilCiclista', perfilCiclista);


module.exports = router;
