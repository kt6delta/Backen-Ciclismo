class Carrera {
    constructor(etapa_id, fecha, equipo_id) {
        this.etapa_id = etapa_id;
        this.fecha = fecha;
        this.equipo_id = equipo_id;
    }
    static crearCarrera(etapa, fecha, equipo ){
        return new Carrera(etapa, fecha, equipo);
    }
}


module.exports = Carrera;