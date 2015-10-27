/* Funciones JS generales Software IMP */

/**
 * @author [Sebastian.DeLaRoche]
 * @date   [27/09/2015]
 * @description [Se envian todos los input de un formulario]
 */

function enviarFormulario(){	
	var valoresInput = {};
	$(".formulariogeneral").find(':input').each(function(data){
		valoresInput[this.name] = this.value; 
	});
	// Se envian datos del formulario	
	$.ajax({
		method: "post",
		url: $(".formulariogeneral")[0].action,
		data: valoresInput,
		beforeSend:function(){},
		success:function(data){		
		
			if(!data.error)
				window.location = data.url;				

		},
		error: function(error){
			alert(error);
			console.log(error);
		}	
	});
}


function mostrarControladoresModulo(elemento)
{

	var id = "#" + elemento;

	if($(id).hasClass("active"))
	{
		$(id).removeClass("active");
		
	}else
	{
		$(id).addClass("active");
	}


}