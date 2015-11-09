//script de evento.html
var map;

// var didYouComment = false;

// GET /markertypes

var markerTypes = [];
var eventMarkers = [];


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

// // GET /eventos/:eventId/markers

// var eventMarkers = [
// 	{
// 	  "position": {"lat" : 25.651505, "lng" : -100.290877}, //rectoria
// 	  "type": "info"
// 	}, 
// 	{
// 	  "position": {"lat" : 25.649447, "lng" : -100.289871}, //a3
// 	  "type": "parking"
// 	},  
// 	{
// 	  "position": {"lat" : 25.652315, "lng" : -100.287709}, //e2
// 	  "type": "parking"
// 	}, 
// 	{
// 	  "position": {"lat" : 25.650486, "lng" : -100.289750}, //bib
// 	  "type": "library"
// 	}
// ];





// function loadMapInfoAjax(idEvento) {

// 	$.get('/api/event/'+idEvento+'/maps/', initialize);
// }


function initializeMap() {
	//Object { lat: "25.6781737", lon: "-100.28790240000001" }
	map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 16,
	  center: new google.maps.LatLng(events.data[0].lat, events.data[0].lon),
	  mapTypeId: google.maps.MapTypeId.ROADMAP,
	});


	$.get('/api/event/' + ev + '/mapFeatures/', loadFeaturesAjax);



}



function loadFeaturesAjax (mapFeatures) {
	var data = JSON.parse(mapFeatures);



	var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
	var icons = markerTypes;
	var features = eventMarkers;

	function addMarker(lat, lng, featType) {
		console.log(featType);
		console.log(icons);
				console.log(icons[featType]);

	  var marker = new google.maps.Marker({
		  position: new google.maps.LatLng(lat, lng),
		  icon: icons[featType].icon,
		  map: map
	  });
	}


	data.forEach( function(element, index, array){
		console.log("adasd");
		addMarker(element.lat, element.lng, element.featType);

	});



	// for (var i = 0, feature; feature = features[i]; i++) {
	//   addMarker(feature);
	// }

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







