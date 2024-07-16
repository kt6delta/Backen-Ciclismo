const express = require('express');
const { getDirectores, crearUsuarioDirector, perfilDirector } = require('../controllers/UsuarioControllerDirector');

const router = express.Router();

router.get('/usuarios/getDirectores',getDirectores);
router.post('/usuarios/crearUsuarioDirector', crearUsuarioDirector);
router.post('/usuarios/perfilDirector', perfilDirector);

module.exports = router;
