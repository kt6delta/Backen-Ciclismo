const UsuarioDAO = require('../daos/UsuarioDAO');


const usuarioDAO = new UsuarioDAO();

const getUsuario = async (req, res) => {
    try {
        const usuarios = await usuarioDAO.getAllUsuarios();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await usuarioDAO.getUsuarioByEmailAndPassword(email, password);
        
        if (!usuario) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }
        // Puedes almacenar el ID del usuario en la sesión, JWT, etc.
        //console.log('ID del usuario autenticado:', usuario.idusuario);
        
        res.status(200).json({ message: 'Login exitoso', idusuario: usuario.idusuario });
    } catch (error) {
        console.error('Error en loginUsuario:', error.message, error.stack);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


module.exports = {
    getUsuario,
    login
};
