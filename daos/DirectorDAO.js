const UsuarioDAO = require("./UsuarioDAO");
const db = require("../utils/Conexion");

class DirectorDAO extends UsuarioDAO {
	async getDirectorByID(idusuario) {
		try {
			console.log("Obteniendo director");
			const response = await db.query(
				"SELECT U.idusuario, U.nombre, U.email, U.sexo, U.rol_id, Di.nacionalidad FROM usuario U INNER JOIN director Di ON U.idusuario = Di.iddirector WHERE U.idusuario = $1",
				[idusuario]
			);

			return response.rows;
		} catch (error) {
			console.error(
				"Error al obtener director:",
				error.message,
				error.stack
			);
			throw new Error("Error interno del servidor");
		}
	}

	async createDirector(director) {
		await this.createUsuario(director);
		try {
			const query = `
                INSERT INTO director (iddirector, nacionalidad)
                VALUES ($1, $2)
            `;
			const values = [director.idUsuario, director.nacionalidad];
			await db.query(query, values);
		} catch (error) {
			console.error("Error al crear director:", error);
			throw new Error("Error interno del servidor");
		}
	}
}

module.exports = DirectorDAO;
