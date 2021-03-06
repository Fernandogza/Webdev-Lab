
// parametros GET, http://www.jquerybyexample.net/2012/06/get-url-parameters-using-jquery.html
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

$(document).ready(function(){
	var idEvento = getUrlParameter('id');
	loadEventoAjax(idEvento);
	loadComentariosAjax(idEvento);
	loadCalendarioAjax(idEvento);
	loadRSVPsAjax(idEvento);
})


function loadEventoAjax(idEvento) {
	$.get('/eventos/' + idEvento, function(evento) {
		console.log(evento);
		$('#descripcion').html(evento.description);
	});

	
}