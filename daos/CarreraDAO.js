const db = require("../utils/Conexion");

class CarreraDAO{
    async crearCarrera(carrera){
        try {

            const query = `
                INSERT INTO carrera (etapa_id, fecha, equipo_id)
                VALUES ($1, $2, $3)
            `;
            const values = [
                
				carrera.etapa_id,
                carrera.fecha,
                JSON.stringify(carrera.equipo_id)

			];
            await db.query(query, values);
            console.log("Se ha creado una carrera");
        } catch (error) {
            console.error(
				"Error al crear carrera:",
				error.message,
				error.stack 
			);
			throw new Error("Error interno del servidor");
        }
    }

}

module.exports = CarreraDAO;