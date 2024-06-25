//constantes
const db = require("../utils/Conexion")
const tipoDocRouter = require('express').Router()

//trare tipos de documento 
tipoDocRouter.get('/', async (req, res) => {
    let result;
    try {
        connection = await db.abrirConexion()
        result = await connection.execute(`SELECT * FROM tipoDoc`)
    } catch (err) {
        return res.send(err.message);
    } finally {
        await db.cerrarConexion(connection)
        if (result.rows.length == 0) {
            return res.send('no hay respuesta')
        } else {
            return res.send(result.rows)
        }
    }
})

module.exports = tipoDocRouter