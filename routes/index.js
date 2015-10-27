var express = require('express');
var router  = express.Router();

//Se importan los controladores
var cuentausuarioController = require('../controllers/cuentausuario/cuentausuarioController');

router.get('/', cuentausuarioController.autenticacion);

router.get('/cuentausuario/cuentausuario/autenticacion', cuentausuarioController.autenticacion);

module.exports = router;