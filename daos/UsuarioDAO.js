const db = require('../utils/Conexion');

class UsuarioDAO {
    async getAllUsuarios() {
        try {
            console.log('Obteniendo todos los usuarios');
            const response = await db.query('SELECT * FROM usuario');
            return response.rows;
        } catch (error) {
            console.error('Error al obtener usuarios:', error.message, error.stack);
            throw new Error('Error interno del servidor');
        }
    }

    async getUsuarioByEmailAndPassword(email, password) {
        try {
            
            // Consulta SQL para buscar el usuario por email y contraseña
            const response = await db.query(
                'SELECT idusuario, rol_id FROM usuario WHERE email = $1 AND password = $2', 
                [email, password]
            );
            
            // Verificamos si se encontró el usuario
            if (response.rows.length === 0) {
                console.log('Usuario no encontrado');
                return null;
            }

            // Retornamos el primer usuario encontrado (debería ser único)
            const usuario = response.rows[0];
            //console.log('Usuario encontrado:');
            return usuario;
        } catch (error) {
            console.error('Error al obtener usuario por email y contraseña:', error.message, error.stack);
            throw new Error('Error interno del servidor');
        }
    }

    async createUsuario(usuario) {
        try {
            console.log('Creando usuario con los siguientes datos:', usuario);
            const query = `
                INSERT INTO usuario (idusuario, nombre, email, password, sexo, rol_id)
                VALUES ($1, $2, $3, $4, $5, $6)
            `;
            const values = [
                usuario.idusuario,
                usuario.nombre,
                usuario.email,
                usuario.password,
                usuario.sexo,
                usuario.rol_id
            ];
            await db.query(query, values);
            console.log('Usuario creado en la base de datos');
        } catch (error) {
            console.error('Error al crear usuario:', error.message, error.stack);
            throw new Error('Error interno del servidor');
        }
    }
}

module.exports = UsuarioDAO;
