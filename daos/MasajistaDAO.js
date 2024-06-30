const UsuarioDAO = require("./UsuarioDAO");
const db = require("../utils/Conexion");

class MasajistaDAO extends UsuarioDAO {
	async getMasajistaByID(idusuario) {
		try {
			console.log("Obteniendo masajista");
			const response = await db.query(
				"SELECT U.idusuario, U.nombre, U.email, U.sexo, U.rol_id, Ma.anios_experiencia FROM usuario U INNER JOIN masajista Ma ON U.idusuario = Ma.idmasajista  WHERE U.idusuario = $1",
				[idusuario]
			);

			return response.rows;
		} catch (error) {
			console.error(
				"Error al obtener masajista:",
				error.message,
				error.stack
			);
			throw new Error("Error interno del servidor");
		}
	}

	async createMasajista(masajista) {
		await this.createUsuario(masajista);
		try {
			const query = `
                INSERT INTO masajista (idmasajista, anios_experiencia)
                VALUES ($1, $2)
            `;
			const values = [masajista.idUsuario, masajista.anios_experiencia];
			await db.query(query, values);
		} catch (error) {
			console.error("Error al crear masajista:", error);
			throw new Error("Error interno del servidor");
		}
	}
}

module.exports = MasajistaDAO;
