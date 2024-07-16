const CiclistaDAO = require('../daos/CiclistaDAO');
const UsuarioFactory = require('../models/UsuarioFactory');
const enviarCorreo = require('../utils/nodemailer').enviarCorreo;
const generarPassword = require('../utils/generarPassword'); 

const ciclistaDAO = new CiclistaDAO();


const getCiclistas = async (req, res) => {
    try {
        const ciclistas = await ciclistaDAO.getAllCiclista();
        res.status(200).json(ciclistas);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


const perfilCiclista = async (req, res) => {
    try {
        const { idusuario } = req.body;
        console.log(idusuario);
        const ciclista = await ciclistaDAO.getCiclistaByID(idusuario);
        
        if (!ciclista) {
            return res.status(401).json({ message: 'No existe ciclista' });
        }
        res.status(200).json({idusuario: ciclista.idusuario, nombre: ciclista.nombre, email: ciclista.email, sexo: ciclista.sexo, rol_id: ciclista.rol_id, especialidad_id: ciclista.especialidad_id, contextura: ciclista.contextura, tiempo_acumulado: ciclista.tiempo_acumulado, nombreEquipo: ciclista.nombreequipo, acciones: ciclista.acciones });
    } catch (error) {
        console.error('Error para obtener ciclista:', error.message, error.stack);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


const crearUsuarioCiclista = async (req, res) => {
    try {
        //console.log('Datos recibidos en el body:', req.body);
        const { idusuario, nombre, email, sexo, rol_id, especialidad_id, contextura } = req.body;
        const password = generarPassword(idusuario, nombre);
        const tiempo_acumulado = "0";

        const ciclista = UsuarioFactory.createUsuario('ciclista', [idusuario, nombre, email, password, sexo, rol_id, especialidad_id, contextura, tiempo_acumulado]);
        
        //console.log('Objeto ciclista creado:', ciclista);
        
        await ciclistaDAO.createCiclista(ciclista);

        //console.log('Ciclista insertado en la base de datos');
        
        enviarCorreo(email, password);

        res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
        console.error('Error en crearUsuarioCiclista:', error.message, error.stack);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    getCiclistas,
    crearUsuarioCiclista,
    perfilCiclista
};
