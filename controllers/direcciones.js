//constantes
const db = require("../utils/Conexion")
const direccionRouter = require('express').Router()

//trarer direcciones
direccionRouter.get('/', async (req, res) => {
    let result;
    try {
        connection = await db.abrirConexion()
        result = await connection.execute(`SELECT * FROM Direccion`)
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

//trarer nomenclaturas
direccionRouter.get('/nomenclatura/:pos', async (req, res) => {
    let result;
    try {
        connection = await db.abrirConexion()
        result = await connection.execute(`SELECT * FROM Nomenclatura WHERE posicionFk = ${req.params.pos}`)
    } catch (err) {
        return res.send(err.message);
    } finally {
        await db.cerrarConexion(connection)
        if (result.rows.length == 0) {
            return res.status(204).json({ error: 'no hay respuesta' })
        } else {
            return res.send(result.rows)
        }
    }
})

//trarer componentesDir
direccionRouter.get('/componente', async (req, res) => {
    let result;
    try {
        connection = await db.abrirConexion()
        result = await connection.execute(`SELECT * FROM ComponenteDirec`)
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

//insertar direcciones
direccionRouter.post('/', async (req, res, next) => {
    let result;
    let id = 0;

    try {
        connection = await db.abrirConexion()
        result = await connection.execute(`SELECT MAX(idDireccion) FROM Direccion`)
    } catch (err) {
        return res.send(err.message);
    } finally {
        await db.cerrarConexion(connection)
        if (result.rows.length == 0) {
        } else {
            if (result.rows[0] != null) {
                id = +result.rows[0] + 1
            }
        }
    }

    const body = req.body; //trae el cuerpo de la petición
    if (!body.posicion || !body.tipoPersona || !body.tipoDoc || !body.nDocumento) { //compueba si alguno de los campos de la petición estan vacios
        console.log(body)
        return res.status(400).json({
            error: 'información faltante'
        })
    }

    let nomenclatura = 'NULL' //Si no hay nomenclatura por defecto es NULL
    if (body.nomenclatura) {
        nomenclatura = `'${body.nomenclatura}'`
    }
    let valor = 'NULL'//Si no hay Valor por defecto es NULL
    if (body.valor) {
        valor = `'${body.valor}'`
    }
    try {
        connection = await db.abrirConexion()
        id = (body.posicion != 1) ? id - 1 : id
        result = await connection.execute(`insert into direccion values (${id},${body.posicion},'${body.tipoPersona}','${body.tipoDoc}','${body.nDocumento}', ${valor}, ${nomenclatura})`)

        await connection.execute(`commit`)
    } catch (err) {
        console.log(err)
    } finally {
        await db.cerrarConexion(connection)
        res.status(201).send("direccion creada correctamente")
    }
})

module.exports = direccionRouter




