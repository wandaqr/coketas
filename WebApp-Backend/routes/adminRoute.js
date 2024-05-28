const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminController');

router.get('/obtenerAdministrador', controller.obtenerAdministrador);
router.post('/guardarAdministrador', controller.crearAdministrador); 

module.exports = router;