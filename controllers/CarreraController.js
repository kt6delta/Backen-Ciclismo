
const CarreraDAO = require('../daos/CarreraDAO');
const Carrera = require('../models/Carrera');
const CarreraFactory = require('../models/CarreraFactory');
const carreraDAO = new CarreraDAO();
const crearCarrera = async (req, res) => {
    try {
        const { etapa_id, fecha, equipo_id } = req.body;
        console.log(req.body);

        const carrera =  CarreraFactory.createCarrera([etapa_id, fecha, equipo_id]);
        console.log("Objeto creado", carrera);
        await carreraDAO.crearCarrera(carrera);
        /*if (!carrera || carrera.equipo_id.length < 2) {
            return res.status(400).json({ error: "Debe haber al menos dos equipos para crear una carrera" });
        }*/


        res.status(201).json({ message: 'Carrera creada exitosamente.' });
    } catch (error) {
        console.error("Error al crear carrera:", error.message, error.stack);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

module.exports = {
    crearCarrera
}