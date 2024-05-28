const usuarioModel = require('../models/usuarioModel');
const objusuarioModel = new usuarioModel();

module.exports = {
    obtenerUsuarios: (req, res) => { 
        objusuarioModel.obtenerUsuarios().then(function (data) {
            res.type('json');
            res.send({ "Success" : true, "Data" : data } );
        }).catch(function (error) {
            res.type('json');
            res.send({ "Success" : false, "Mensaje" : error.message } );
        });                
    },

    cambiarEstadoUsuario: (req, res) => {
        const id_usuario = req.params.id_usuario; 
    
        objusuarioModel.actualizarUsuarioEstado(id_usuario)
        .then(resultado => {
                res.json({ success: true, message: 'Estado del usuario actualizado correctamente' });
        })
        .catch(error => {
            console.error("Error al actualizar el estado del usuario:", error);
            res.status(500).json({ success: false, message: error.message || 'Error al procesar la solicitud' });
        });
    }
    
    
    
   
}