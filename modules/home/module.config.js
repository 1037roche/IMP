//Se importa express
var express = require("express");

//Configuracion del modulo
var configModule = module.exports = express();

//Se importan los controladores
var homeController = require('./controllers/homeController');

/**
 * @author [Sebastian.DeLaRoche]
 * @date   [17/10/2015]
 * @description [Se valida la session del usuario]
 */
configModule.validarSession = function(request, response, next){
	if(!request.session.usuario)
		response.redirect("/autenticarusuario");
	else
		next();	  
}

//GET
configModule.get("/home", configModule.validarSession ,homeController.home);