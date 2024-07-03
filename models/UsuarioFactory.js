const Ciclista = require('./Ciclista');
const Director = require('./Director');
const Masajista = require('./Masajista');
const Equipo = require('./Equipo');

class UsuarioFactory{
    static createUsuario(tipo, datos) {
        switch (tipo) {
            case 'ciclista':
                return new Ciclista(...datos);
            case 'masajista':
                return new Masajista(...datos);
            case 'director':
                return new Director(...datos);
            default:
                throw new Error('Tipo no soportado');
        }
    }

    static createEquipo(datos) {
        return new Equipo(...datos);
    }
}

module.exports = UsuarioFactory;
