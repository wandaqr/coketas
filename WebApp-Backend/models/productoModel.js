const dao = require('./dao');
const objDao = new dao();

class productoModel {
    constructor() {}

    obtenerProductos() {
        var sql = `
            SELECT p.id_producto, p.nombre, p.descripcion, p.precio , p.talla, p.stock, p.estado_producto, p.imagen, c.nombre as categoria_nombre
            FROM producto p
            JOIN categoria c ON p.id_categoriaf = c.id_categoria
            ORDER BY p.id_producto DESC;`;
        return objDao.select(sql);
    }    

    obtenerUnProducto(id_producto) {
        var sql = `
            SELECT p.id_producto, p.nombre, p.descripcion, p.precio, p.talla, p.stock, p.estado_producto, p.imagen, c.id_categoria, c.nombre as categoria_nombre
            FROM producto p
            JOIN categoria c ON p.id_categoriaf = c.id_categoria
            WHERE p.id_producto = $1;`;
        const params = [id_producto];
        return objDao.execute_one(sql, params);
    }


    insertarProducto(nombre, descripcion, precio, talla, stock, estado_producto, id_categoriaf, imagen) {
        var sql = `
            INSERT INTO producto (nombre, descripcion, precio, talla, stock, estado_producto, imagen, id_categoriaf)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`;
        var params = [nombre, descripcion, precio, talla, stock, estado_producto, id_categoriaf, imagen];
        return objDao.execute_one(sql, params);
    }
    
    actualizarProducto(id_producto, nombre, descripcion, precio, talla, stock, id_categoriaf, imagen) {
        let sql = `
            UPDATE producto
            SET nombre = $2, descripcion = $3, precio = $4 , talla = $5, stock = $6, id_categoriaf = $7
            ${imagen ? ", imagen = $8" : ""}
            WHERE id_producto = $1
            RETURNING *;`;
        let params = imagen ? [id_producto, nombre, descripcion, precio, talla, stock, id_categoriaf, imagen] : [id_producto, nombre, descripcion, precio, talla, stock, id_categoriaf];
        return objDao.execute_one(sql, params);
    }

    alternarEstadoProducto(id) {
        const sql = `
            UPDATE producto
            SET estado_producto = CASE WHEN estado_producto = 1 THEN 0 ELSE 1 END
            WHERE id_producto = $1
            RETURNING *;`; 
        const params = [id];
        return objDao.execute_one(sql, params);
    }
}

module.exports = productoModel;
