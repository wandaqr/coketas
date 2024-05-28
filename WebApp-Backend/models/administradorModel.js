const dao = require('./dao');
const objDao = new dao();

class adminModel {
    constructor () {}

    obtenerAdministrador() {
        var sql = "SELECT a.id_admin, a.nombre, a.apellido, a.celular, a.id_usuariof, u.email, u.estado_usuario FROM administrador a JOIN usuario u ON a.id_usuariof = u.id_usuario";
        return objDao.select(sql);
    }

    guardarUsuario(data) {
        var sql = 'INSERT INTO usuario(email, pass, estado_usuario) VALUES($1, $2, $3) RETURNING id_usuario';
        var params = [data.email, data.pass, data.estado_usuario];
        return objDao.execute_one(sql, params);
    }

    verUltimoId() {
        var sql = 'SELECT MAX(id_usuario) AS id_usuario FROM usuario';
        return objDao.execute_one(sql)
            .then(result => {
                console.log("verUltimoId result:", result);
                return result;
            });
    }
    
    guardarAdministrador(data, idUsuario) {
        var sql = 'INSERT INTO administrador(nombre, apellido, celular, id_usuariof) VALUES($1, $2, $3, $4) RETURNING id_admin';
        var params = [data.nombre, data.apellido, data.celular, idUsuario];
        return objDao.execute_one(sql, params);
    }

    
}


module.exports = adminModel;
