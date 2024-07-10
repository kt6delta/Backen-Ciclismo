const express = require('express');
const cors = require('cors');
const app = express();
const config = require('./utils/Config');
const logger = require('./utils/logger');

// Importar routers
const ciclistaRouter = require('./routers/CiclistaRouter');
const directorRouter = require('./routers/DirectorRouter');
const masajistaRouter = require('./routers/MasajistaRouter');
const usuarioRouter = require('./routers/UsuarioRouter');
const equipoRouter = require('./routers/EquipoRouter');
const carreraRouter = require('./routers/CarreraRouter');

app.use(cors({
    origin: '*', 
    methods: '*', 
    allowedHeaders: '*', 
}));

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Usar routers
app.use(ciclistaRouter);
app.use(directorRouter);
app.use(masajistaRouter);
app.use(usuarioRouter);
app.use(equipoRouter);
app.use(carreraRouter);

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`);
});
