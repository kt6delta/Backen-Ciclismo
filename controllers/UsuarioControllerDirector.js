const DirectorDAO = require('../daos/DirectorDAO');
const UsuarioFactory = require('../models/UsuarioFactory');
const enviarCorreo = require('../utils/nodemailer').enviarCorreo;
const generarPassword = require('../utils/generarPassword'); 

const directorDAO = new DirectorDAO();

const perfilDirector = async (req, res) => {
    try {
        const { idusuario} = req.body;
        const director = await directorDAO.getDirectorByID(idusuario);
        
        if (!director) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        res.status(200).json(director);
    } catch (error) {
        console.error('Error para obtener director:', error.message, error.stack);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


const crearUsuarioDirector = async (req, res) => {
    try {
        //console.log('Datos recibidos en el body:', req.body);
        const { idUsuario, nombre, email, sexo, rol_id, nacionalidad } = req.body;
        const password = generarPassword(idUsuario, nombre);

        const director = UsuarioFactory.createUsuario('director', [idUsuario, nombre, email, password, sexo, rol_id, nacionalidad]);
        
        //console.log('Objeto director creado:', director);

        await directorDAO.createDirector(director);

        //console.log('Director insertado en la base de datos');

        enviarCorreo(email, director.password);

        res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    crearUsuarioDirector,
    perfilDirector
};
