const express = require('express');
const { crearUsuarioDirector, perfilDirector } = require('../controllers/UsuarioControllerDirector');

const router = express.Router();

router.post('/usuarios/crearUsuarioDirector', crearUsuarioDirector);
router.get('/usuarios/perfilDirector', perfilDirector);

module.exports = router;
