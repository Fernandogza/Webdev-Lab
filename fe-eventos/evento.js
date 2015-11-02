//script de evento.html
var map;

// var didYouComment = false;

// GET /markertypes

var markerTypes = {
	"parking" : {
	  "name": "Estacionamiento",
	  "icon": "https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png"
  },
  "library" : {
	  "name": "Biblioteca",
	  "icon": "https://maps.google.com/mapfiles/kml/shapes/library_maps.png"
  },
  "info" : {
	  "name": "Informacion",
	  "icon": "https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png"
  }
};

// GET /eventos/:eventId/markers

var eventMarkers = [
	{
	  "position": {"lat" : 25.651505, "lng" : -100.290877}, //rectoria
	  "type": "info"
	}, 
	{
	  "position": {"lat" : 25.649447, "lng" : -100.289871}, //a3
	  "type": "parking"
	},  
	{
	  "position": {"lat" : 25.652315, "lng" : -100.287709}, //e2
	  "type": "parking"
	}, 
	{
	  "position": {"lat" : 25.650486, "lng" : -100.289750}, //bib
	  "type": "library"
	}
];

// GET /eventos/:eventId/comments

var comments = [
	{
		"name" : "Juan",
		"text" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},

	{
		"name" : "Maria",
		"text" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},

	{
		"name" : "Maria",
		"text" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	}
];

// GET /eventos/:eventId/calendar

var calendar = {
	"view" : "week", // week, day, month

	"events" : [
		{
			"title" : "Inauguracion",
			"allDay" : false,
			"start" : "2015-11-22T12:00:00"
			"end": "2015-11-22T16:00:00"
		},
		{
			"title" : "Cena",
			"allDay" : false,
			"start" : "2015-11-22T19:00:00"
			"end": "2015-11-22T22:00:00"
		}
	]
};

function initialize() {
	map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 16,
	  center: new google.maps.LatLng(25.651313, -100.289604),
	  mapTypeId: google.maps.MapTypeId.ROADMAP,
	});



	var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
	var icons = markerTypes;
	var features = eventMarkers;

	function addMarker(feature) {
	  var marker = new google.maps.Marker({
		  position: new google.maps.LatLng(feature.position.lat, feature.position.lng),
		  icon: icons[feature.type].icon,
		  map: map
	  });
	}


	for (var i = 0, feature; feature = features[i]; i++) {
	  addMarker(feature);
	}

	var legend = document.getElementById('legend');
	for (var key in icons) {
	  var type = icons[key];
	  var name = type.name;
	  var icon = type.icon;
	  var div = document.createElement('div');
	  div.innerHTML = '<img src="' + icon + '"> ' + name;
	  legend.appendChild(div);
	}

	 map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);
}

google.maps.event.addDomListener(window, 'load', initialize);

window.onload = function(){
	document.getElementById("commentButton").onclick = addComment;

}


function addComment(){
	var name, msg;
	name = "Jorge";
	msg = $("#textarea1").val();

	var text;
	text = '<div class="row"><div class="col s1"><p><i class="material-icons">play_arrow</i></p></div><div class="col s2"><p>Jorge</p></div><div class="col s9"><p>'+msg+'</p></div></div>';


	$("#comentarios").append(text);


	$("#textarea1").val('');

	return;
}


$(document).ready(function() {

    // page is now ready, initialize the calendar...

    $('#calendar').fullCalendar({
				lang: 'es'
    })

});
