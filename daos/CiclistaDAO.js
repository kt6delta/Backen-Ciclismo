const UsuarioDAO = require("./UsuarioDAO");
const db = require("../utils/Conexion");

class CiclistaDAO extends UsuarioDAO {

	async getCiclistaByID(idusuario) {
		try {
			console.log("Obteniendo ciclista");
			const response = await db.query(
				`SELECT U.idusuario, U.nombre, U.email, U.sexo, U.rol_id, Ci.especialidad_id, Ci.contextura, 
				Ci.tiempo_acumulado,  E.nombre nombreequipo, Esp.acciones
				FROM usuario U, ciclista Ci, equipo E, especialidad Esp
				WHERE U.idusuario = Ci.idciclista and
				Ci.equipo_id = E.idequipo and
				Esp.idespecialidad = Ci.especialidad_id and
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
				"Error al obtener ciclista:",
				error.message,
				error.stack
			);
			throw new Error("Error interno del servidor");
		}
	}

	async createCiclista(ciclista) {
		//console.log('Creando ciclista con los siguientes datos:', ciclista);
		try {
			await this.createUsuario(ciclista);
			//console.log('Usuario base para ciclista creado');

			const query = `
                INSERT INTO ciclista (idciclista, especialidad_id, contextura, tiempo_acumulado)
                VALUES ($1, $2, $3, $4)
            `;
			const values = [
				ciclista.idusuario,
				ciclista.especialidad_id,
				ciclista.contextura,
				ciclista.tiempo_acumulado,
			];
			await db.query(query, values);
			console.log("Ciclista creado en la base de datos");
		} catch (error) {
			console.error(
				"Error al crear ciclista:",
				error.message,
				error.stack
			);
			throw new Error("Error interno del servidor");
		}
	}
}

module.exports = CiclistaDAO;
