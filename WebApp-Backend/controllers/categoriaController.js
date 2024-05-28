const categoriaModel = require('../models/categoriaModel');
const objcategoriaModel = new categoriaModel();

module.exports = {
    obtenerCategoria: (req, res) => { 
        objcategoriaModel.obtenerCategoria().then(function (data) {
            res.type('json');
            res.send({ "Success" : true, "Data" : data } );
        }).catch(function (error) {
            res.type('json');
            res.send({ "Success" : false, "Mensaje" : error.message } );
        });                
    },
    
    agregarCategoria: (req, res) => { 
        const { nombre } = req.body; 
    
        objcategoriaModel.agregarCategoria(nombre)
            .then(categoria => {
                res.status(201).json({ Success: true });
            })
            .catch(error => {
                console.error("Error al insertar el producto:", error);
                res.status(500).json({ Success: false, Mensaje: error.message });
            });
    },

    editarCategoria: (req, res) => {
        const { id_categoria } = req.params; 
        const { nombre } = req.body; 
    
        objcategoriaModel.editarCategoria(id_categoria, nombre)
            .then(() => {
                res.json({ Success: true, Message: "Categoría actualizada correctamente." });
            })
            .catch(error => {
                console.error("Error al actualizar la categoría:", error);
                res.status(500).json({ Success: false, Mensaje: error.message });
            });
    },

    eliminarCategoria: (req, res) => {
        const { id_categoria } = req.params;
    
        objcategoriaModel.eliminarCategoria(id_categoria)
            .then(() => {
                res.json({ Success: true, Message: "Categoría eliminada correctamente." });
            })
            .catch(error => {
                if (error.code === '23503') {
                    res.status(400).json({ Success: false, Mensaje: "La categoría está siendo usada en algún producto y no puede ser eliminada." });
                } else {
                    console.error("Error al eliminar la categoría:", error);
                    res.status(500).json({ Success: false, Mensaje: error.message });
                }
            });
    },

    obtenerCategoriaPorId: (req, res) => {
        const { id_categoria } = req.params; 
    
        objcategoriaModel.obtenerCategoriaPorId(id_categoria)
            .then(categoria => {
                if (categoria) {
                    res.json({ Success: true, Data: categoria });
                } else {
                    res.status(404).json({ Success: false, Mensaje: "Categoría no encontrada." });
                }
            })
            .catch(error => {
                console.error("Error al obtener la categoría:", error);
                res.status(500).json({ Success: false, Mensaje: error.message });
            });
    }
    
    
    
    

    
    
    
   
}