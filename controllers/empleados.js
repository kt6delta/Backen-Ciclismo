//constantes
const db = require("../utils/Conexion")
const empleadoRouter = require('express').Router()


//obterner empleado (todos)
empleadoRouter.get('/:cod', async (req, res) => {
  let result;
  try {
    connection = await db.abrirConexion()
    result = await connection.execute(
      `SELECT EC.codEmpleadoFk, C.nomCargo
      FROM cargo C, empleadoCargo EC
      WHERE EC.codCargoFK = C.codCargo and
      C.estadoCargo = 1 and
      EC.codEmpleadoFK = ${req.params.cod}`
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

module.exports = empleadoRouter;