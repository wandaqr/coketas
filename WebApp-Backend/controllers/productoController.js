const productoModel = require('../models/productoModel');
const objproductoModel = new productoModel();

module.exports = {
    obtenerProductos(req, res) {
        objproductoModel.obtenerProductos().then(function (data) {
            res.type('json');
            res.send({ "Success" : true, "Data" : data } );
        }).catch(function (error) {
            res.type('json');
            res.send({ "Success" : false, "Mensaje" : error.message } );
        });                
    },

    obtenerUnProducto(req, res) {
        const id_producto = req.params.id_producto;

        objproductoModel.obtenerUnProducto(id_producto).then(function (data) {
            res.json({ "Success": true, "Data": data });
        }).catch(function (error) {
            console.error("Error al obtener el producto:", error);
            res.status(500).json({ "Success": false, "Mensaje": error.message });
        });                
    },



    insertarProducto(req, res) {
        const { nombre, descripcion, precio, talla, stock, estado_producto, id_categoriaf } = req.body;
        const imagen = req.file ? req.file.path : null;
    
        objproductoModel.insertarProducto(nombre, descripcion, precio, talla, stock, estado_producto, imagen, id_categoriaf)
            .then(producto => {
                res.status(201).json({ Success: true, Data: producto });
            })
            .catch(error => {
                console.error("Error al insertar el producto:", error);
                res.status(500).json({ Success: false, Mensaje: error.message });
            });
    },
    

    actualizarProducto(req, res) {
        const { id_producto } = req.params; //viene del enpoint
        const { nombre, descripcion, precio, talla, stock, id_categoriaf } = req.body; //datos provientes del usuario manualmente
        const imagen = req.file ? req.file.path : null; 
        objproductoModel.actualizarProducto(id_producto, nombre, descripcion, precio, talla, stock, id_categoriaf, imagen)
            .then(producto => {
                res.json({ Success: true, Data: producto });
            })
            .catch(error => {
                console.error("Error al actualizar el producto:", error);
                res.status(500).json({ Success: false, Mensaje: error.message });
            });
    },
    
    alternarEstadoProducto(req, res) {
        const { id } = req.params;
        objproductoModel.alternarEstadoProducto(id)
            .then(producto => {
                res.json({ Success: true, Data: producto });
            })
            .catch(error => {
                console.error("Error al alternar el estado del producto:", error);
                res.status(500).json({ Success: false, Mensaje: error.message });
            });
    }
    
};
