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
		var CuentaUsuario = oConexion.define('cuentausuario', {

			id : { type: Sequelize.INTEGER, primaryKey: true},
			nombres		: Sequelize.STRING,
			apellidos	: Sequelize.STRING,
			usuario 	: Sequelize.STRING,
			contrasena 	: Sequelize.STRING,
			email 		: Sequelize.STRING,
			activo 		: {  type: Sequelize.BOOLEAN, defaultValue: true }

		}, {
			// configuracion de la tabla
			timestamps: false, // Elimina las marcas de tiempo en la tabla
			freezeTableName: true // Model tableName will be the same as the model name
		});

		// Se definen funciones del modelo CuentaUsuario		
		return {
			validarUsuario : function (usuario, contrasena) {								

				return CuentaUsuario.findAndCountAll( {where : {usuario : usuario, contrasena : contrasena}});
			}
		};


	}
	catch(error)
	{
		console.error(error);
	}
}