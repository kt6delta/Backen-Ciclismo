//constantes
const db = require("../utils/Conexion")
const productoRouter = require('express').Router()


//obterner producto (por codigo)
productoRouter.get('/:cod', async (req, res) => {
  let result;
  try {
    connection = await db.abrirConexion()
    result = await connection.execute(
      `SELECT C.desCatProducto, P.refProducto, P.nomProducto, H.valor
      FROM producto P, catProducto C, historicoPrecio H
      WHERE P.refProducto = ${req.params.cod} and
          H.fechaFin is NULL and
          H.refProductoFK = P.refProducto and
          P.idCatProductoFK = idCatProducto`
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

//verificar existencia de producto
productoRouter.get('/existencia/:cod', async (req, res) => {
  let result;
  try {
    connection = await db.abrirConexion()
    result = await connection.execute(
      `SELECT existencia
        FROM Inventario
        WHERE refProductoFK = ${req.params.cod} and
        consecInven = (SELECT max(consecInven)
                      FROM Inventario
                      WHERE refProductoFK = ${req.params.cod})`
    )
  } catch (err) {
    return res.send(err.message);
  } finally {
    await db.cerrarConexion(connection)
    if (result.rows.length == 0) {
      return res.send([0])
    } else {
      return res.send(result.rows[0])
    }
  }
})

module.exports = productoRouter;