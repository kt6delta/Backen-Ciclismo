class Equipo{

    constructor(nombre, pais, tiempo_total, participantes_equipo, director_id, masajistas) {
        this.nombre = nombre;
        this.pais = pais;
        this.tiempo_total = tiempo_total;
        this.participantes_equipo = participantes_equipo;
        this.director_id = director_id;
        this.masajistas = masajistas;
    }

};

module.exports = Equipo;