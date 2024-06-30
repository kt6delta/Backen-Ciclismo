const Usuario = require('./Usuario');

class Masajista extends Usuario {
    constructor(idusuario, nombre, email, password, sexo, rol_id, anios_experiencia) {
        super(idusuario, nombre, email, password, sexo, rol_id);
        this.anios_experiencia = anios_experiencia;
    }
}

module.exports = Masajista;
