const express = require('express');
const router = express.Router();
const controller = require('../controllers/loginController');

router.post('/administrador', controller.loguearAdministrador); 

module.exports = router;