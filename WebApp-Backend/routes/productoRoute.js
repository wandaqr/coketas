const express = require('express');
const router = express.Router();
const multer = require('multer');
const controller = require('../controllers/productoController');

// Configuración para almacenar archivos en el servidor
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'upload/'); 
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error("No es un tipo de archivo de imagen"), false);
    }
};

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB para el tamaño máximo de archivo
    },
    fileFilter: fileFilter
});

// Rutas
router.get('/obtenerProductos', controller.obtenerProductos);
router.post('/registrarProducto', upload.single('imagen'), controller.insertarProducto);
router.put('/editarProducto/:id_producto', upload.single('imagen'), controller.actualizarProducto);
router.patch('/editarEstado/:id', controller.alternarEstadoProducto);
router.get('/verProducto/:id_producto', controller.obtenerUnProducto);

module.exports = router;
