const db = require("../utils/Conexion");

class EquipoDAO {
	async getAllEquipos() {
		try {
			console.log("Obteniendo todos los equipos");
			const response = await db.query("SELECT * FROM equipo");
			return response.rows;
		} catch (error) {
			console.error( "Error al obtener equipos:", error.message, error.stack);
			throw new Error("Error interno del servidor");
		}
	}

	async createEquipo(equipo) {
		try {
			console.log("Creando equipo con los siguientes datos:", equipo);
			const query = `INSERT INTO equipo (idequipo, nombre, pais, tiempo_total, participantes_equipo) VALUES ($1, $2, $3, $4, $5, $6)`;
			const values = [
				equipo.idequipo,
				equipo.nombre,
				equipo.pais,
				equipo.tiempo_total,
				equipo.participantes_equipo,
			];
			await db.query(query, values);
			console.log("Equipo creado en la base de datos");
		} catch (error) {
			console.error("Error al crear equipo:", error.message, error.stack);
			throw new Error("Error interno del servidor");
		}
	}
}

module.exports = EquipoDAO;
