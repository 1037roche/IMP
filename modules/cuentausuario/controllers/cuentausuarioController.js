/**
 * @author [Sebastian.DeLaRoche]
 * @date   [17/10/2015]
 * @description [cuentausuarioController encargado de manejar acciones para autenticacion del personal del software]
 */

/**
 * @author [Sebastian.DeLaRoche]
 * @date   [17/10/2015]
 * @description [Se importa el modelo cuentausuarioModels.js]
 */

var oModeloCuentaUsuario = require("../models/cuentausuarioModels.js")();

var oAdministrar = require("../../administrar/models/administrarModels")();

var md5 = require('md5');

/**
 * @author [Sebastian.DeLaRoche]
 * @date   [17/10/2015]
 * @description [Constructor del controlador cuentausuarioController inicializador del objeto global etc]
 */
exports.constructor = function(request, response, next){
	next();
}

/**
 * @author [Sebastian.DeLaRoche]
 * @date   [17/10/2015]
 * @description [Accion encargada de controlador los eventos de la autenticacion de un usuario]
 */
exports.autenticarusuario = function(request, response, next){
	
	//Si la peticion en GET se carga la vista accion
	if(request.method == "GET")
	{		
		//Objeto que contiene los datos que se renderizaran en la vista
		var oVista = {
			titulo : "Atenticar GET",
			accion : "/autenticarusuario"
		}

		response.render("cuentausuario/autenticarusuario",{oVista:oVista});
		
	//Si la peticion es post accede al modelo validando las credenciales de un usuario
	}else
	{
		try
		{
			// Se obtiene los datos del formulario 
			var sUsuario 	= request.body.usuario; 
			
			var sContrasena = md5(request.body.contrasena);

			var oRespuesta = oModeloCuentaUsuario.validarUsuario(sUsuario, sContrasena);

			oRespuesta.then( function (respuesta) {

				var iCount = respuesta.count;
				
				var oValues = respuesta.rows[0].dataValues;

				if(iCount > 0)
				{					
					// Se guardan datos del cliente en sesion					
					var oDatosUsuario = oFuncionesControlador.ordenarDatosUsuario(oValues);

					request.session.usuario = oDatosUsuario;

					return oAdministrar.cargarModulosCliente(oDatosUsuario.idusuario);

				}
				else
				{
					// Credenciales de usuario incorrectas
					// Se contruye json para dar respuesta al cliente
					
					var oJSON = {
						error : "Credenciales de usuario incorrectas"
					};
					
					response.json(oJSON);
				}

			}).then(function (oConfiguracion) {

				// Guarda la cofiguracion del usuario				
				request.session.modulos = oConfiguracion;

				var oJSON = {
					url : "/home"
				};
								
				response.json(oJSON);

			});
		
		}catch(error)
		{
			console.log("Entro por error");
			console.error(error);
		}
	}
}

exports.cerrarcuentausuario = function(request, response){	

	response.session.activo = false;
	response.redirect("/autenticarusuario");
}


/**
 * @author [Sebastian.DeLaRoche]
 * @date   [17/10/2015]
 * @description funciones privadas del controlador
 */
var oFuncionesControlador = {

	/**
	 * @author [Sebastian.DeLaRoche]
	 * @date   [24/10/2015]
	 * @description Organiza los datos del usuario.
	 */
	ordenarDatosUsuario : function (oDatos) {				
		return {usuario: oDatos.usuario, idusuario : oDatos.id};
	}
};