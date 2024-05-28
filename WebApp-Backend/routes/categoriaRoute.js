const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoriaController');

router.get('/obtenerCategorias', controller.obtenerCategoria); 
router.post('/agregarCategorias', controller.agregarCategoria); 
router.put('/editarCategoria/:id_categoria', controller.editarCategoria); 
router.delete('/eliminarCategoria/:id_categoria', controller.eliminarCategoria);
router.get('/obtenerCategoriaID/:id_categoria', controller.obtenerCategoriaPorId);



module.exports = router;    