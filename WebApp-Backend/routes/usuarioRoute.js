const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuarioController');

router.get('/obtenerUsuarios', controller.obtenerUsuarios); 
router.put('/actualizarUsuarioEstado/:id_usuario', controller.cambiarEstadoUsuario);


module.exports = router;    