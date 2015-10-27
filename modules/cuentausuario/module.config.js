//Se importa express
var express = require("express");

//Configuracion del modulo
var configModule = module.exports = express();

//Se importan los controladores
var cuentausuarioController = require('./controllers/cuentausuarioController');

/**
 * @author [Sebastian.DeLaRoche]
 * @date   [17/10/2015]
 * @description [Se valida la session del usuario]
 */
configModule.validarSession = function(request, response, next){
	if(request.session.usuario)
		response.redirect("/home");
	else
		next();
}

//GET
configModule.get("/autenticarusuario", configModule.validarSession ,cuentausuarioController.constructor ,cuentausuarioController.autenticarusuario);

//POST
configModule.post("/autenticarusuario", cuentausuarioController.constructor ,cuentausuarioController.autenticarusuario);

//GET
configModule.get("/cerrarcuentausuario" ,cuentausuarioController.cerrarcuentausuario);
