const UsuarioDAO = require("./UsuarioDAO");
const db = require("../utils/Conexion");

class DirectorDAO extends UsuarioDAO {

	async getAllDirectores() {
        try {
            console.log('Obteniendo todos los director');
            const response = await db.query('SELECT * FROM director');
            return response.rows;
        } catch (error) {
            console.error('Error al obtener director:', error.message, error.stack);
            throw new Error('Error interno del servidor');
        }
    }




	async getDirectorByID(idusuario) {
		try {
			console.log("Obteniendo director");
			const response = await db.query(
				`SELECT U.idusuario, U.nombre, U.email, U.sexo, U.rol_id, Di.nacionalidad, E.nombre nombreequipo
				FROM usuario U, director Di, equipo E
				WHERE U.idusuario = Di.iddirector and
				U.idusuario = $1`,
				[idusuario]
			);

			// Verificamos si se encontró el usuario
            if (response.rows.length === 0) {
                console.log('Usuario no encontrado');
                return null;
            }

            // Retornamos el primer usuario encontrado (debería ser único)
            const usuario = response.rows[0];

			//console.log(usuario);
		
			return usuario;
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
			const values = [director.idusuario, director.nacionalidad];
			await db.query(query, values);
		} catch (error) {
			console.error("Error al crear director:", error);
			throw new Error("Error interno del servidor");
		}
	}

	async actualizarDirectorConEquipo(equipoId, director_id) {
        try {

			const query = `UPDATE director SET equipo_id = $1 WHERE iddirector = $2`;
			const values = [equipoId, director_id];

			console.log(`Director con ID ${director_id} actualizado con equipo_id ${equipoId}`);
			await db.query(query, values);
            
        } catch (error) {
            console.error("Error al actualizar director con equipo:", error.message, error.stack);
            throw new Error("Error interno del servidor");
        }
    }



}

module.exports = DirectorDAO;
