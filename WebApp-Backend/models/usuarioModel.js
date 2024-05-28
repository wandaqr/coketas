const dao = require('./dao');
const objDao = new dao();

class usuarioModel {
    constructor () {}
    obtenerUsuarios() {
        var sql = "SELECT * FROM usuario";
        return objDao.select(sql);
    }
    
    actualizarUsuarioEstado(id_usuario) {
        var sql = 'UPDATE usuario SET estado_usuario = CASE WHEN estado_usuario = 1 THEN 0 ELSE 1 END WHERE id_usuario = $1 RETURNING estado_usuario';
        var params = [id_usuario];
        return objDao.execute_one(sql, params);
    }
}

module.exports = usuarioModel;        