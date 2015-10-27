var obdIMP = require('../../../library/BD/bd');

function cuentausuario(){
	this.obdConexion = new obdIMP();
}




cuentausuario.prototype.validarCuentaUsuario = function(sUsuario, sContrasena) {

	try
	{
		var sSQL = "SELECT COUNT(*) existe FROM cuentausuario WHERE usuario = ? AND contrasena = md5(?);";

		var aDatos = [sUsuario, sContrasena];

		var oRespuesta = this.obdConexion.query(sSQL, aDatos);

		return oRespuesta;

	}catch(error)
	{
		throw new Error(error);
	}
};

module.exports = cuentausuario;