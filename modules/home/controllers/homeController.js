/**
 * @author [Sebastian.DeLaRoche]
 * @date   [17/10/2015]
 * @description [Accion encargada de controlador los eventos de la autenticacion de un usuario]
 */
exports.home = function(request, response, next){
		
	//Objeto que contiene los datos que se renderizaran en la vista
	var oVista = {
		titulo : "HOME",
		header : true,
		modulosMenu : request.session.modulos
	}

	response.render("home/home", {oVista : oVista});	
}