
var events = [];
var idEvento;

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

var asd;
function loadEventoAjax(idEvento) {

	this.idEvento = idEvento;
	$.get('api/event/' + idEvento, function(evento) {
		//console.log(evento);
		console.log(events);
		events = JSON.parse(evento);
		$('#descripcionEvento').html(events.data[0].description);
		$('#nombreEvento').html(events.data[0].name);
		$('#lugarEvento').html(events.data[0].place);
		initializeMap();
	});

	$.get('/api/event/'+ idEvento+"/pic", function(pics){
		var json = JSON.parse(pics);
		$("#imgholder").attr('href', json.data[0].url);
		$("#imgimg").attr('src', json.data[0].url);
		$.each(json.data, function(index, pic) {
			if(index>0){
				$(".image-set").append("<a  href='"+pic.url+"' data-lightbox='example-set'></a>");
			}
		});
	});

	$.get('/api/event/'+ idEvento+"/titlePic", function(pics){
		var json = JSON.parse(pics);
		$("#titlePic").attr('src', json[0].url);
		console.log(pics);
		asd = json;
	});
}









