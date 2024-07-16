const DirectorDAO = require('../daos/DirectorDAO');
const UsuarioFactory = require('../models/UsuarioFactory');
const enviarCorreo = require('../utils/nodemailer').enviarCorreo;
const generarPassword = require('../utils/generarPassword'); 

const directorDAO = new DirectorDAO();

const getDirectores = async (req, res) => {
    try {
        const direcores = await directorDAO.getAllDirectores();
        res.status(200).json(direcores);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const perfilDirector = async (req, res) => {
    try {
        const { idusuario} = req.body;
        const director = await directorDAO.getDirectorByID(idusuario);
        
        if (!director) {
            return res.status(401).json({ message: 'No existe Director' });
        }

        res.status(200).json({idusuario: director.idusuario, nombre: director.nombre, email: director.email, sexo: director.sexo, rol_id: director.rol_id, nacionalidad: director.nacionalidad, nombreEquipo: director.nombreequipo });
    } catch (error) {
        console.error('Error para obtener director:', error.message, error.stack);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


const crearUsuarioDirector = async (req, res) => {
    try {
        console.log('Datos recibidos en el body:', req.body);
        const { idusuario, nombre, email, sexo, rol_id, nacionalidad } = req.body;
        const password = generarPassword(idusuario, nombre);

        const director = UsuarioFactory.createUsuario('director', [idusuario, nombre, email, password, sexo, rol_id, nacionalidad]);
        
        console.log('Objeto director creado:', director);

        await directorDAO.createDirector(director);

        console.log('Director insertado en la base de datos');

        enviarCorreo(email, director.password);

        res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    getDirectores,
    crearUsuarioDirector,
    perfilDirector
};
