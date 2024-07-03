const EquipoDAO = require("../daos/EquipoDAO");
const UsuarioFactory = require('../models/UsuarioFactory');

const equipoDAO = new EquipoDAO();

const getEquipo = async (req, res) => {
	try {
		const equipo = await equipoDAO.getAllEquipos();
		res.status(200).json(equipo);
	} catch (error) {
		res.status(500).json({ error: "Error interno del servidor" });
	}
};

const crearEquipo = async (req, res) => {
	try {
		console.log("Datos recibidos en el body:", req.body);
		const { nombre, pais, participantes_equipo } = req.body;
		const tiempo_total = 0;

		const equipo = UsuarioFactory.createEquipo([nombre, pais, tiempo_total, participantes_equipo]);

		await equipoDAO.createEquipo(equipo);

		console.log("Equipo insertado en la base de datos");

		res.status(201).json({ message: "Equipo creado exitosamente" });
	} catch (error) {
		console.error("Error en crearEquipo", error.message, error.stack);
		res.status(500).json({ error: "Error interno del servidor" });
	}
};

module.exports = {
	getEquipo,
	crearEquipo,
};
