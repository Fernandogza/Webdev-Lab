//script de evento.html
var map;

// var didYouComment = false;

function initialize() {
	map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 16,
	  center: new google.maps.LatLng(25.651313, -100.289604),
	  mapTypeId: google.maps.MapTypeId.ROADMAP,
	});



	var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
	var icons = {
	  parking: {
		  name: 'Estacionamiento',
		  icon: iconBase + 'parking_lot_maps.png'
	  },
	  library: {
		  name: 'Biblioteca',
		  icon: iconBase + 'library_maps.png'
	  },
	  info: {
		  name: 'Informacion',
		  icon: iconBase + 'info-i_maps.png'
	  }
	};

	function addMarker(feature) {
	  var marker = new google.maps.Marker({
		  position: feature.position,
		  icon: icons[feature.type].icon,
		  map: map
	  });
	}

	var features = [
	  {
		  position: new google.maps.LatLng(25.651505, -100.290877), //rectoria
		  type: 'info'
	  }, {
		  position: new google.maps.LatLng(25.649447, -100.289871), //a3
		  type: 'parking'
	  },  {
		  position: new google.maps.LatLng(25.652315, -100.287709), //e2
		  type: 'parking'
	  }, {
		  position: new google.maps.LatLng(25.650486, -100.289750), //bib
		  type: 'library'
	  }
	];


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

	// msg = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
	



	name = "Jorge";

	// msg = $("#textarea1").val();

	msg = $("#textarea1").val();

	// alert($("#textarea1").val());

	var text;

	text = '<div class="row"><div class="col s1"><p><i class="material-icons">play_arrow</i></p></div><div class="col s2"><p>Jorge</p></div><div class="col s9"><p>'+msg+'</p></div></div>';


	$("#comentarios").append(text);


	$("#textarea1").val('');

	/*
	var comment = document.getElementById("textarea1").value;

	if (comment.length < 5 ){
		return false;
	}

	var parent = document.getElementById("comentarios");
	var appendTo = document.createElement("div");

	var node1 = document.createElement("div");
	node1.setAttribute("class", "col s1");
	node1.appendChild(document.createElement("p"));

	var childNode1 = document.createElement("i");
	childNode1.setAttribute("class", "material-icons");
	childNode1.innerHTML = "play_arrow";
	node1.firstChild.appendChild(childNode1);


	appendTo.appendChild(node1);

	var node2 = document.createElement("div");
	node2.setAttribute("class", "col s2");
	node2.appendChild(document.createElement("p"));

	node2.firstChild.innerHTML = "Jorge";

	appendTo.appendChild(node2);

	var node3 = document.createElement("div");
	node3.setAttribute("class", "col s9");
	node3.appendChild(document.createElement("p"));
	node3.firstChild.innerHTML = comment;

	appendTo.appendChild(node3);


	parent.appendChild(appendTo);

	*/

	// didYouComment = true;

	// document.getElementById("commentButton").setAttribute("class", "btn waves-effect waves-light blue darken-4 enabled");
	return;
}


$(document).ready(function() {

    // page is now ready, initialize the calendar...

    $('#calendar').fullCalendar({
				lang: 'es'
    })

});
