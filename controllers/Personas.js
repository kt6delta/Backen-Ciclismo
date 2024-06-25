//constantes
const db = require("../utils/Conexion")
const personaRouter = require('express').Router()


//obterner personas (todos)
personaRouter.get('/', async (req, res) => {
    let result;
    try {
        connection = await db.abrirConexion()
        result = await connection.execute(`SELECT * FROM Persona`)
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

//insertar personas
personaRouter.post('/', async (req, res, next) => {
    const body = req.body; //trae el cuerpo de la petición
    if (!body.nombre || !body.apellido || !body.tipoPersona || !body.tipoDoc || !body.nDocumento) { //compueba si alguno de los campos de la petición estan vacios
        return res.status(400).json({
            error: 'información faltante'
        })
    }

    let result;
    try {
        connection = await db.abrirConexion()
        result = await connection.execute(`insert into persona values ('${body.tipoPersona}','${body.tipoDoc}','${body.nDocumento}','${body.nombre}','${body.apellido}')`)
        await connection.execute(`commit`)
    } catch (err) {
        console.log(err)
        if (err.message.includes('ORA-00001')) {
            await db.cerrarConexion(connection)
            return res.status(409).json({
                error: 'La persona ya existe'
            })
        }
    } finally {
        await db.cerrarConexion(connection)
        if (result) {
            res.status(201).send("Persona creada correctamente")
        }
    }
})

//obtener los clientes
personaRouter.get('/:tipoP/:nombre', async (req, res) => {
    let result;
    try {
        connection = await db.abrirConexion()
        result = await connection.execute(
            `SELECT P.nombre||' '||P.apellido cliente, idTipoPersonaFK, idTipoDocFK, nDocumento
            FROM Persona P, tipoPersona TP
            WHERE P.idTipoPersonaFK = TP.idTipoPersona and
            descTipoPersona = '${req.params.tipoP}' AND 
            lower(P.nombre||' '||P.apellido) like '%${req.params.nombre}%'`
        )
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

//obtener los clientes sin filtro
personaRouter.get('/:tipoP', async (req, res) => {
    let result;
    try {
        connection = await db.abrirConexion()
        result = await connection.execute(
            `SELECT P.nombre||' '||P.apellido cliente, idTipoPersonaFK, idTipoDocFK, nDocumento
            FROM Persona P, tipoPersona TP
            WHERE P.idTipoPersonaFK = TP.idTipoPersona and
            descTipoPersona = '${req.params.tipoP}'`
        )
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
module.exports = personaRouter