const CiclistaDAO = require("./CiclistaDAO");
const db = require("../utils/Conexion");
const DirectorDAO = require("./DirectorDAO");
const MasajistaDAO = require("./MasajistaDAO");

class EquipoDAO {
    constructor() {
        this.ciclistaDAO = new CiclistaDAO();
        this.directorDAO = new DirectorDAO();
        this.masajistaDAO = new MasajistaDAO();
    }

    async validarEquipo(participantes_equipo) {
        const especialidadesRequeridas = ['escalador', 'rodador', 'embalador', 'gregario', 'clasicomano', 'contrarrelojista'];
        const ciclistasValidos = new Set();

        for (let especialidad of especialidadesRequeridas) {
            if (!participantes_equipo[especialidad] || participantes_equipo[especialidad].length === 0) {
                throw new Error(`Falta el ciclista de la especialidad ${especialidad}`);
            }

            for (let ciclista of participantes_equipo[especialidad]) {
                console.log(`Validando ciclista: ${JSON.stringify(ciclista)} en la especialidad ${especialidad}`);

                if (!ciclista.id) {
                    throw new Error(`Falta el ID del ciclista en la especialidad ${especialidad}`);
                }

                if (ciclistasValidos.has(ciclista.id)) {
                    throw new Error(`El ciclista con id ${ciclista.id} está duplicado en otra especialidad`);
                }

                const response = await db.query(
                    `SELECT U.rol_id, Ci.especialidad_id, Esp.nombre 
                     FROM usuario U 
                     JOIN ciclista Ci ON U.idusuario = Ci.idciclista 
                     JOIN especialidad Esp ON Esp.idespecialidad = Ci.especialidad_id 
                     WHERE U.idusuario = $1 AND Esp.nombre = $2`,
                    [ciclista.id, especialidad]
                );

                if (response.rows.length === 0) {
                    throw new Error(`El ciclista con id ${ciclista.id} no tiene la especialidad ${especialidad} o no existe`);
                }

                ciclistasValidos.add(ciclista.id);
            }
        }
    }

    async getAllEquipos() {
        try {
            console.log("Obteniendo todos los equipos");
            const response = await db.query("SELECT * FROM equipo");
            return response.rows;
        } catch (error) {
            console.error("Error al obtener equipos:", error.message, error.stack);
            throw new Error("Error interno del servidor");
        }
    }

    async createEquipo(equipo) {
        try {

            // Verificar la longitud del array de masajistas
            if (equipo.masajistas.length < 1 || equipo.masajistas.length > 2) {
                throw new Error("El equipo debe tener 1 o 2 masajistas");
            }

            console.log("Creando equipo con los siguientes datos:", equipo);
            const query = `INSERT INTO equipo (nombre, pais, tiempo_total, participantes_equipo, director_id, masajistas) VALUES ($1, $2, $3, $4, $5, $6) RETURNING idequipo`;
            const values = [
                equipo.nombre,
                equipo.pais,
                equipo.tiempo_total,
                JSON.stringify(equipo.participantes_equipo),
                equipo.director_id,
                equipo.masajistas
            ];

            // Inserta el equipo y obtiene el ID generado
            const response = await db.query(query, values);
            const equipoId = response.rows[0].idequipo;
            //console.log("Equipo creado en la base de datos con ID:", equipoId);

            // Actualiza los ciclistas con el ID del equipo recién creado
            await this.ciclistaDAO.actualizarCiclistasConEquipo(equipoId, equipo.participantes_equipo);
            //console.log("Ciclistas actualizados con el ID del equipo");
            await this.directorDAO.actualizarDirectorConEquipo(equipoId, equipo.director_id);

            await this.masajistaDAO.actualizarMasajistasConEquipo(equipoId, equipo.masajistas);

        } catch (error) {
            console.error("Error al crear equipo:", error.message, error.stack);
            throw new Error("Error interno del servidor");
        }
    }
}

module.exports = EquipoDAO;
