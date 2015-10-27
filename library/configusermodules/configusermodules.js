var obdIMP = require('../BD/bd');

module.exports = configmodulesuser;

function configmodulesuser(request, response, next){

	function config(idUsusario){		
		this.obdConexion = new obdIMP();		
		this.idUsusario = idUsusario;
		this.htmlModulosMenu = "XXXXXXx";
	}

	config.prototype.cargarmodulos = function(){

		var sSQL = "SELECT modulo.nombrepanel, modulo.nombreruta FROM perfilpermisos  JOIN modulo ON perfilpermisos.idmodulo = modulo.id WHERE idperfil = ?;";
		var aParametros = [this.idUsusario];
		var oRespuesta = this.obdConexion.query(sSQL, aParametros);

		var retonarHtmlModulosMenu =function(oData){

			var  sHtmlModulosMenu = "";
			
			for (var i in oData)
			{
				sHtmlModulosMenu += "<li class='treeview'><a href='"+oData['nombreruta']+"'><i class='fa fa-files-o'></i><span>"+oData['nombrepanel']+"</span></a></li>";
			}
	
			request.session.menumodulos = sHtmlModulosMenu;
		}

		oRespuesta.on('result', function(row){
			retonarHtmlModulosMenu(row);
		});

	};

/*
	config.prototype.retonarHtmlModulosMenu = function(oData){

		var  sHtmlModulosMenu = "";

		for (var i in oData)
		{
			sHtmlModulosMenu += "<li class='treeview'><a href='"+oData['nombreruta']+"'><i class='fa fa-files-o'></i><span>"+oData['nombrepanel']+"</span></a></li>";
		}
		
	}


	*/

	request.configmodulesuser = config;
	
	next();
}