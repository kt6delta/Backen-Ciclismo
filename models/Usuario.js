
class Usuario {
    constructor(idusuario, nombre, email, password, sexo, rol_id) {
        this.idusuario = idusuario;
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.sexo = sexo;
        this.rol_id = rol_id;
    }
}

module.exports = Usuario;
