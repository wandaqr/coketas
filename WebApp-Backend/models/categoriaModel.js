const dao = require('./dao');
const objDao = new dao();

class categoriaModel {
    constructor () {}
    obtenerCategoria() {
        var sql = "SELECT * FROM categoria ORDER BY id_categoria DESC";
        return objDao.select(sql);
    }

    agregarCategoria(nombre){
        var sql = "INSERT INTO categoria(nombre) VALUES ($1)"
        var params = [nombre];
        return objDao.execute_none(sql, params);
    }
    editarCategoria(id_categoria, nombre) {
        var sql = "UPDATE categoria SET nombre = $1 WHERE id_categoria = $2";
        var params = [nombre, id_categoria];
        return objDao.execute_none(sql, params); 
    }
    
    eliminarCategoria(id_categoria) {
        var sql = "DELETE FROM categoria WHERE id_categoria = $1";
        var params = [id_categoria];
        return objDao.execute_none(sql, params); 

    }
    obtenerCategoriaPorId(id_categoria) {
        var sql = "SELECT * FROM categoria WHERE id_categoria = $1";
        var params = [id_categoria];
        return objDao.execute_one(sql, params); // Asegúrate de que esta función maneja correctamente la promesa.
    }

    


}

module.exports = categoriaModel;        