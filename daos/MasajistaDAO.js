const UsuarioDAO = require("./UsuarioDAO");
const db = require("../utils/Conexion");

class MasajistaDAO extends UsuarioDAO {

	async getAllMasajistas() {
        try {
            console.log('Obteniendo todos los masajistas');
            const response = await db.query('SELECT * FROM masajista');
            return response.rows;
        } catch (error) {
            console.error('Error al obtener masajistas:', error.message, error.stack);
            throw new Error('Error interno del servidor');
        }
    }


	async getMasajistaByID(idusuario) {
		try {
			console.log("Obteniendo masajista");
			const response = await db.query(
				"SELECT U.idusuario, U.nombre, U.email, U.sexo, U.rol_id, Ma.anios_experiencia FROM usuario U INNER JOIN masajista Ma ON U.idusuario = Ma.idmasajista  WHERE U.idusuario = $1",
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
			const values = [masajista.idusuario, masajista.anios_experiencia];
			await db.query(query, values);
		} catch (error) {
			console.error("Error al crear masajista:", error);
			throw new Error("Error interno del servidor");
		}
	}

	async actualizarMasajistasConEquipo(equipoId, masajistas) {
        try {
            for (let masajistaId of masajistas) {
                await db.query(
                    `UPDATE masajista SET equipo_id = $1 WHERE idmasajista = $2`,
                    [equipoId, masajistaId]
                );
                console.log(`Masajista con ID ${masajistaId} actualizado con equipo_id ${equipoId}`);
            }

        } catch (error) {
            console.error("Error al actualizar ciclistas con equipo:", error.message, error.stack);
            throw new Error("Error interno del servidor");
        }
    }

}

module.exports = MasajistaDAO;
