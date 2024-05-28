const adminModel = require('../models/administradorModel');
const objAdminModel = new adminModel();

module.exports = {
    obtenerAdministrador: (req, res) => { 
        objAdminModel.obtenerAdministrador().then(function (data) {
            res.type('json');
            res.send({ "Success": true, "Data": data });
        }).catch(function (error) {
            res.type('json');
            res.send({ "Success": false, "Mensaje": error.message });
        });                
    },

    crearAdministrador: (req, res) => {
        const usuarioData = {
            email: req.body.email,
            pass: req.body.pass,
            estado_usuario: req.body.estado_usuario
        };
    
        objAdminModel.guardarUsuario(usuarioData).then(resultadoUsuario => {
            console.log("guardarUsuario result:", resultadoUsuario);
            if (resultadoUsuario && resultadoUsuario.id_usuario) {
                const idUsuario = parseInt(resultadoUsuario.id_usuario);
                console.log("Parsed ID Usuario:", idUsuario);
                const adminData = {
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    celular: req.body.celular
                };
                return objAdminModel.guardarAdministrador(adminData, idUsuario);
            } else {
                return objAdminModel.verUltimoId().then(resultadoLastId => {
                    if (resultadoLastId && resultadoLastId.id_usuario) {
                        const idUsuario = parseInt(resultadoLastId.id_usuario);
                        console.log("Backup Parsed ID Usuario:", idUsuario);
                        const adminData = {
                            nombre: req.body.nombre,
                            apellido: req.body.apellido,
                            celular: req.body.celular
                        };
                        return objAdminModel.guardarAdministrador(adminData, idUsuario);
                    } else {
                        throw new Error('No se pudo obtener el último ID del usuario.');
                    }
                });
            }
        })
        .then(resultadoAdmin => {
            res.json({ success: true, message: 'Administrador creado correctamente', data: resultadoAdmin });
        })
        .catch(error => {
            console.error("Error en la operación de base de datos:", error);
            res.status(500).json({ success: false, message: 'Error al crear administrador', error: error.message || 'Error al procesar la solicitud' });
        });
    },    
    
    
};
