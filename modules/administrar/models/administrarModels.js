var ORM_Sequelize = require("../../../library/BD/bd");

var Sequelize = ORM_Sequelize().Sequelize;

var oConexion = ORM_Sequelize().oSequelize;

/**
 * Se setean los mensajes de errores
 */
var aMsjErrores = [];

module.exports = function(){

	try
	{				
		// Se retorna objeto de funciones
		return {

			cargarModulosCliente : function (iIdCliente) {

				var sSQL = "SELECT modulo.id, modulo.nombrepanel, modulo.nombreruta FROM cuentausuario JOIN perfilpermisos on cuentausuario.idperfil = perfilpermisos.idperfil JOIN modulo on perfilpermisos.idmodulo = modulo.id WHERE cuentausuario.id = ?;";

				var oParametros = [iIdCliente];

				return oConexion.query( sSQL , {
				 
				  	replacements: oParametros, 
				  	type: Sequelize.QueryTypes.SELECT
				 
				 }).then( function (modulos) {

				 	var sSQL = oHelpersModel.getSQLControladoresModulo(modulos);

				 	return oConexion.query(sSQL, { type: Sequelize.QueryTypes.SELECT })
				 	.then( function (controladores) {
					 	return oHelpersModel.getEstructuraModulos(modulos, controladores);
				 	});
				 
				 });
			}
		};
	}
	catch(error)
	{
		console.error(error);
	}
}


/**
 * @author [Sebastian.DeLaRoche]
 * @date   [25/10/2015]
 * @description Objeto con funciones privadas para el modelo
 */

var oHelpersModel = {

	/**
	 * @author [Sebastian.DeLaRoche]
	 * @date   [25/10/2015]
	 * @description funcion encargada de estructurar los datos del modelo
	 */

	getEstructuraModulos : function (modulos, controladores) {

		modulos.forEach( function (modulo) {

			controladores.forEach( function (controlador) {

				if(modulo.id == controlador.idmodulo)
				{
					if(modulo.controlador === undefined)
					{
						modulo.controlador = [controlador];						
					}else
					{
						modulo.controlador.push(controlador);
					}
				}
			});	
		});

		return modulos;
	},

	getSQLControladoresModulo : function (oDatos) {

		var sSQL = "SELECT controlador.idmodulo ,controlador.nombrepanel, controlador.nombreruta FROM controlador WHERE controlador.idmodulo in ( ";

		var sConstrain = "";

	 	oDatos.forEach( function (modulo) {
	 		sConstrain  += (sConstrain.length === 0) ? modulo.id : ", " + modulo.id;
	 	});

		return sSQL +  sConstrain + " );";
	}
};