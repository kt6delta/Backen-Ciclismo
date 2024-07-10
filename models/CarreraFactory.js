const Carrera = require("./Carrera")

class CarreraFactory{
    static createCarrera(datos){
        return new Carrera(...datos);
    }
}

module.exports = CarreraFactory;