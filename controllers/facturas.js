const db = require("../utils/Conexion")
const facturaRouter = require('express').Router()
const PDFDocument = require('pdfkit');

//Crear factura
facturaRouter.post('/', async (req, res, next) => {

  const doc = new PDFDocument();

  // Establece el nombre del archivo de salida
  const fileName = 'factura.pdf';


  const body = req.body; //trae el cuerpo de la petición
  if (!body.tipoFac || !body.codEmpleado || !body.tipoPersona || !body.tipoDoc || !body.nDocumento || body.cantidades.length === 0 || body.productos.length === 0) { //compueba si alguno de los campos de la petición estan vacios
    return res.status(400).json({
      error: 'información faltante'
    })
  }
  if (body.tipoFac == "DV" || body.tipoFac == "DC") {
    if (!body.nFacturaRef || !body.tipoFacRef) { //si es una devolucion debe incluir la factura que referencia
      return res.status(400).json({
        error: 'falta numero factura referencia'
      })
    }
  }
  let nFactura
  let result

  // se asigna un numero para la factura
  try {
    connection = await db.abrirConexion()
    result = await connection.execute(`SELECT count(nFactura) FROM Factura`)
  } catch (err) {
    return res.send(err.message);
  } finally {
    await db.cerrarConexion(connection)
    if (result.rows.length != 0) {
      nFactura = +result.rows[0] + 1
    }
  }

  let precios = []
  let preciosU = []
  let total = 0
  //Se calcula el precio total de la factura
  try {
    connection = await db.abrirConexion()
    body.productos.forEach(async (producto, i) => {
      result = await connection.execute(
        `SELECT valor
          FROM HistoricoPrecio
          WHERE fechaFin is NULL and
          refProductoFK = ${producto}`
      )
      precios[i] = +result.rows[0] * body.cantidades[i]
      preciosU[i] = +result.rows[0]
    });
  } catch (err) {
    return res.send(err.message);
  } finally {
    await db.cerrarConexion(connection)
    precios.forEach((precio) => {
      total = total + precio
    })
  }

  let tipoFacRef = 'NULL' //Si no hay tipoFacRef por defecto es NULL
  if (body.tipoFacRef) {
    tipoFacRef = `'${body.tipoFacRef}'`
  }
  let nFacturaRef = 'NULL' //Si no hay nFacturaRef por defecto es NULL
  if (body.nFacturaRef) {
    nFacturaRef = `'${body.nFacturaRef}'`
  }

  //Se insertan los valores en la tabla factura
  console.log(`insert into factura values (
    '${body.tipoFac}','${nFactura}','${body.tipoPersona}',
    '${body.tipoDoc}','${body.nDocumento}',${tipoFacRef},
    ${nFacturaRef},'${body.codEmpleado}',SYSDATE,${total}
  )`)
  try {
    connection = await db.abrirConexion()
    result = await connection.execute(
      `insert into factura values (
        '${body.tipoFac}','${nFactura}','${body.tipoPersona}',
        '${body.tipoDoc}','${body.nDocumento}',${tipoFacRef},
        ${nFacturaRef},'${body.codEmpleado}',SYSDATE,${total}
      )`
    )
    await connection.execute(`commit`)
  } catch (err) {
    //console.log(err)
    if (err.message.includes('ORA-02291')) {
      return res.status(400).json({
        error: 'La factura referenciada no existe'
      })
    }
  } finally {
    await db.cerrarConexion(connection)
    console.log(result)
  }

  let datosFactura, y
  try {
    connection = await db.abrirConexion()
    datosFactura = await connection.execute(
      `SELECT TF.descTipoFac, F.nFactura, TP.descTipoPersona,
        P.nombre||' '||P.apellido, F.idTipoDocFK, P.nDocumento,
        F.tipoFacRef, F.nFacturaRef, E.nomEmpleado||' '||E.apellEmpleado,
        TO_CHAR(F.fechaFactura, 'dd/mm/yyyy'), totalFactura
      FROM TipoFactura TF, TipoPersona TP, Factura F, Persona P, Empleado E
      WHERE TP.idTipoPersona = P.idTipoPersonaFK and
      P.idTipoPersonaFK = F.idTipoPersonaFK and
      P.idTipoDocFK = F.idTipoDocFK and
      P.nDocumento = F.nDocumentoFK and
      TF.idTipoFac = F.idTipoFacFK and
      E.codEmpleado = F.codEmpleadoFK and
      F.nFactura = ${nFactura}`
    )
  } catch (err) {
    return res.send(err.message);
  } finally {
    await db.cerrarConexion(connection)
    if (datosFactura.rows.length != 0) {
      datosFactura = datosFactura.rows[0]
      y = 50
      doc.fontSize(20).text(`Factura N°${datosFactura[1]} - ${datosFactura[0]} `, 50, y);
      y = y + 60
      doc.fontSize(15).text(`${datosFactura[2]}: ${datosFactura[3]} / ${datosFactura[4]} ${datosFactura[5]}`, 50, y);
      y = y + 30
      if (datosFactura[6] != null) {
        doc.fontSize(15).text(`Devolución de factura: ${datosFactura[6]} ${datosFactura[7]}`, 50, y);
        y = y + 30
      }
      doc.fontSize(15).text(`Empleado: ${datosFactura[8]}`, 50, y);
      y = y + 30
      doc.fontSize(15).text(`Fecha: ${datosFactura[9]}`, 50, y);
    }
  }
  let productosPDF = []
  let categoria, consecutivo, salen, entran, existencia, inventarioRef
  try {
    for (let i = 0; i < body.productos.length; i++) {
      const producto = body.productos[i]//se recorre cada producto
      if (body.cantidades[i] != 0) {
        connection = await db.abrirConexion()
        categoria = await connection.execute(
          `SELECT idCatProductoFK, nomproducto
            FROM Producto
            WHERE refProducto = ${producto}`
        )
        productosPDF.push({ nombre: categoria.rows[0][1], cantidad: body.cantidades[i], precio: precios[i], precioU: preciosU[i] })


        //se añade registro en DetalleFactura
        result = await connection.execute(
          `insert into DetalleFactura values (
            '${body.tipoFac}','${nFactura}','${i + 1}',
            ${i + 1},'${categoria.rows[0][0]}','${producto}',
            ${body.cantidades[i]},${precios[i]}
          )`
        )

        await connection.execute(`commit`)
        await db.cerrarConexion(connection)

        connection = await db.abrirConexion()

        //Busca la existencia actual del producto
        r = await connection.execute(
          `SELECT existencia
            FROM Inventario
            WHERE refProductoFK = ${producto} and
            consecInven = (SELECT max(consecInven)
                          FROM Inventario
                          WHERE refProductoFK = ${producto})`
        )
        existencia = 0
        if (r.rows.length != 0) {
          existencia = +r.rows[0]
        }

        if (body.tipoFac == "VE" || body.tipoFac == "DC") {
          //si es venta o devolución compra los productos salen del inventario
          salen = body.cantidades[i]
          entran = 'NULL'
          existencia = existencia - salen
        }
        else {
          //si es compra o devolución venta los productos entran al inventario
          entran = body.cantidades[i]
          salen = 'NULL'
          existencia = existencia + entran
        }

        inventarioRef = 'NULL'
        if (body.nFacturaRef) {
          //Si es devolucion se debe buscar el inventario al que modifica 
          r = await connection.execute(
            `SELECT consecInven
              FROM Inventario
              WHERE facturaFK = ${nFacturaRef} and
              tipoFacFK = ${tipoFacRef} and
              refProductoFK = ${producto}`
          )
          inventarioRef = `'${r.rows[0][0]}'`
        }

        //Se calcula el consecutivo de inventario
        consecutivo = await connection.execute(`SELECT nvl(max(consecInven),0) FROM Inventario`)
        //Se añade registro a inventario
        console.log(`insert into inventario values (${+consecutivo.rows[0] + 1},'${categoria.rows[0][0]}','${producto}','${body.tipoFac}','${nFactura}','${i + 1}',${inventarioRef},sysdate, ${salen},${entran},${existencia})`)
        result = await connection.execute(
          `insert into inventario values (
            ${+consecutivo.rows[0] + 1},'${categoria.rows[0][0]}','${producto}',
            '${body.tipoFac}','${nFactura}','${i + 1}',${inventarioRef},
            sysdate, ${salen},${entran},${existencia}
          )`
        )

        await connection.execute(`commit`)
      }
      await db.cerrarConexion(connection)
    };

    let tableTop = y + 40; // Ajusta la posición inicial de la tabla
    const rowHeight = 30;
    const col1 = 50; // Ajusta la posición de la primera columna
    const col2 = 250; // Ajusta la posición de la segunda columna
    const col3 = 350; // Ajusta la posición de la tercera columna
    const col4 = 450; // Ajusta la posición de la tercera columna

    // Encabezados de la tabla
    doc
      .fontSize(15)
      .text('Producto', col1, tableTop)
      .text('Cantidad', col2, tableTop)
      .text('Precio/U', col3, tableTop)
      .text('Total', col4, tableTop);
    let lineY = doc.y + 10;
    doc.moveTo(50, lineY).lineTo(550, lineY).stroke();
    tableTop = tableTop + 15
    // Contenido de la tabla
    productosPDF.forEach((producto, index) => {
      y = tableTop + (index + 1) * rowHeight;
      doc
        .fontSize(12)
        .text(producto.nombre, col1, y)
        .text(producto.cantidad.toString(), col2, y)
        .text(`$${producto.precioU.toFixed(2)}`, col3, y)
        .text(`$${producto.precio.toFixed(2)}`, col4, y);
    });

    lineY = doc.y + 10;
    doc.moveTo(50, lineY).lineTo(550, lineY).stroke();

    // Total
    doc
      .fontSize(12)  // Ajusta la posición del texto
      .text(`$${total.toFixed(2)}`, col4, lineY + 15);  // Ajusta la posición del total

  } catch (err) {
    return res.send(err.message);
  } finally {
    if (result) {
      // Configura el encabezado para la descarga del archivo
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
      res.setHeader('Content-Type', 'application/pdf');
      // Conecta la respuesta al flujo de escritura del documento PDF
      doc.pipe(res);
      doc.end();
    }
  }
})

module.exports = facturaRouter