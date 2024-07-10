const Equipo = require('./Equipo');

class EquipoFactory{

    static createEquipo(datos) {
        return new Equipo(...datos);
    }

}

module.exports = EquipoFactory;