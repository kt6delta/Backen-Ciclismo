const Ciclista = require('./Ciclista');
const Director = require('./Director');
const Masajista = require('./Masajista');

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
}

module.exports = UsuarioFactory;
