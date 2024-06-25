
//declaraciones
const express = require('express')
const app = express()
const cors = require('cors')

const personaRouter = require('./controllers/Personas')
const tipoDocRouter = require('./controllers/tipoDoc')
const tipoPersonaRouter = require('./controllers/tipoPersona')
const tipoContactoRouter = require('./controllers/tipoContacto')
const contactoRouter = require('./controllers/contactos')
const direccionRouter = require('./controllers/direcciones')
const empleadoRouter = require('./controllers/empleados')
const facturaRouter = require('./controllers/facturas')
const productoRouter = require('./controllers/productos')

//Uso declaraciones
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Definimos las rutas base de la API
app.use('/api/personas', personaRouter)
app.use('/api/tipodoc', tipoDocRouter)
app.use('/api/tipopersona', tipoPersonaRouter)
app.use('/api/tipocontacto', tipoContactoRouter)
app.use('/api/contactos', contactoRouter)
app.use('/api/direcciones', direccionRouter)
app.use('/api/empleados', empleadoRouter)
app.use('/api/facturas', facturaRouter)
app.use('/api/productos', productoRouter)

//habilitamos para  usar en  otros archivos
module.exports = app




