const Usuario = require('./Usuario');

class Director extends Usuario {
    constructor(idusuario, nombre, email, password, sexo, rol_id, nacionalidad) {
        super(idusuario, nombre, email, password, sexo, rol_id);
        this.nacionalidad = nacionalidad;
    }
}

module.exports = Director;
