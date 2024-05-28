const dao = require('./dao');
const objDao = new dao();

class loginModel {
    constructor () {}

    loguear(email, pass) {
        const sql = `
            SELECT u.email 
            FROM usuario u
            JOIN administrador a ON u.id_usuario = a.id_usuariof
            WHERE u.email = $1 AND u.pass = $2`;
        const params = [email, pass];
        return objDao.execute_one(sql, params);
    }
}

module.exports = loginModel;
