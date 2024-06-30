const Usuario = require('./Usuario');

class Ciclista extends Usuario {
    constructor(idusuario, nombre, email, password, sexo, rol_id, especialidad_id, contextura, tiempo_acumulado) {
        super(idusuario, nombre, email, password, sexo, rol_id);
        this.especialidad_id = especialidad_id;
        this.contextura = contextura;
        this.tiempo_acumulado = tiempo_acumulado;
    }
}

module.exports = Ciclista;
