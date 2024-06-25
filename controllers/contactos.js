//constantes
const db = require("../utils/Conexion")
const contactoRouter = require('express').Router()

//trarer contactos
contactoRouter.get('/', async (req, res) => {
    let result;
    try {
        connection = await db.abrirConexion()
        result = await connection.execute(`SELECT * FROM Contacto`)
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

//insertar contacto
contactoRouter.post('/', async (req, res, next) => {
    let result;
    let consecutivo = 0;

    const body = req.body; //trae el cuerpo de la petición
    if (!body.tipoContacto || !body.descTipoContacto || !body.tipoPersona || !body.tipoDoc || !body.nDocumento || !body.descContacto) { //compueba si alguno de los campos de la petición estan vacios
        console.log(body)
        return res.status(400).json({
            error: 'información faltante'
        })
    }

    try {
        connection = await db.abrirConexion()
        result = await connection.execute(`SELECT max(consecContacto) FROM Contacto`)
    } catch (err) {
        await db.cerrarConexion(connection)
        return res.send(err.message);
    } finally {
        await db.cerrarConexion(connection)
        if (result.rows.length == 0) {
        } else {
            console.log(result.rows[0])
            if (result.rows[0][0] != null) {
                consecutivo = +result.rows[0] + 1
            }
        }
    }

    try {
        connection = await db.abrirConexion()
        console.log(consecutivo)
        result = await connection.execute(`insert into contacto values ('${consecutivo}','${body.tipoContacto}','${body.descTipoContacto}','${body.tipoPersona}','${body.tipoDoc}','${body.nDocumento}','${body.descContacto}')`)
        await connection.execute(`commit`)
    } catch (err) {
        console.log(err)
    } finally {
        await db.cerrarConexion(connection)
        res.status(201).send("contacto creado correctamente")
    }
})

//agregar contactos

module.exports = contactoRouter