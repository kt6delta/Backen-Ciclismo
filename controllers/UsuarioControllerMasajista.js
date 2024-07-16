const MasajistaDAO = require('../daos/MasajistaDAO');
const UsuarioFactory = require('../models/UsuarioFactory');
const enviarCorreo = require('../utils/nodemailer').enviarCorreo;
const generarPassword = require('../utils/generarPassword'); 

const masajistaDAO = new MasajistaDAO();

const getMasajistas = async (req, res) => {
    try {
        const masajistas = await masajistaDAO.getAllMasajistas();
        res.status(200).json(masajistas);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


const perfilMasajista = async (req, res) => {
    try {
        const { idusuario} = req.body;
        const masajista = await masajistaDAO.getMasajistaByID(idusuario);
        
        if (!masajista) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        res.status(200).json({idusuario: masajista.idusuario, nombre: masajista.nombre, email: masajista.email, sexo: masajista.sexo, rol_id: masajista.rol_id, anios_experiencia: masajista.anios_experiencia });
    } catch (error) {
        console.error('Error para obtener masajista:', error.message, error.stack);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


const crearUsuarioMasajista = async (req, res) => {

    try {
        //console.log('Datos recibidos en el body:', req.body);
        const { idusuario, nombre, email, sexo, rol_id, anios_experiencia } = req.body;
        const password = generarPassword(idusuario, nombre);

        const masajista = UsuarioFactory.createUsuario('masajista', [idusuario, nombre, email, password, sexo, rol_id, anios_experiencia]);
        
        //console.log('Objeto director creado:', masajista);

        await masajistaDAO.createMasajista(masajista);

        //console.log('Masajista insertado en la base de datos');

        enviarCorreo(email, masajista.password);

        res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    getMasajistas,
    crearUsuarioMasajista,
    perfilMasajista
};
