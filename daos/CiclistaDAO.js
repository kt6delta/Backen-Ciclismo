const UsuarioDAO = require("./UsuarioDAO");
const db = require("../utils/Conexion");

class CiclistaDAO extends UsuarioDAO {

	async getAllCiclista() {
        try {
            console.log('Obteniendo todos los ciclistas');
            const response = await db.query('SELECT * FROM ciclista');
            return response.rows;
        } catch (error) {
            console.error('Error al obtener ciclistas:', error.message, error.stack);
            throw new Error('Error interno del servidor');
        }
    }


	async getCiclistaByID(idusuario) {
		try {
			console.log("Obteniendo ciclista");
			const response = await db.query(
				`SELECT U.idusuario, U.nombre, U.email, U.sexo, U.rol_id, Ci.especialidad_id, Ci.contextura, Ci.tiempo_acumulado,  E.nombre nombreequipo, Esp.acciones
				FROM usuario U, ciclista Ci, equipo E, especialidad Esp
				WHERE U.idusuario = Ci.idciclista and
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

	async insertarCiclsitaEquipo(){

		
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


	async actualizarCiclistasConEquipo(equipoId, participantesEquipo) {
        try {
            const especialidades = Object.keys(participantesEquipo);

            for (let especialidad of especialidades) {
                const ciclistas = participantesEquipo[especialidad];

                for (let ciclista of ciclistas) {
                    await db.query(
                        `UPDATE ciclista SET equipo_id = $1 WHERE idciclista = $2`,
                        [equipoId, ciclista.id]
                    );
                    console.log(`Ciclista con ID ${ciclista.id} actualizado con equipo_id ${equipoId}`);
                }
            }
        } catch (error) {
            console.error("Error al actualizar ciclistas con equipo:", error.message, error.stack);
            throw new Error("Error interno del servidor");
        }
    }


	
}

module.exports = CiclistaDAO;
