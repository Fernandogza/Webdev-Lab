
// dependencias
const
	express = require('express'),
	http = require('http');

// crear la aplicacion de express
const app = express();
const port = process.env.PORT || 3000; // u obtener de argv
const env = process.env.NODE_ENV || 'dev';

// deshabilitar caching
app.disable('etag');


// rutas
app.use('/eventos/:eventId/rsvps', function(req, res) {
	res.send([
		{
			"name" : "Alvin",
			"attending" : "yes"
		},
		{
			"name" : "Alan",
			"attending" : "no"
		},
		{
			"name" : "Jonathan",
			"attending" : "maybe"
		}
	]);
});

app.use('/eventos/:eventId/calendar', function(req, res) {
	res.send([
		{
			"title" : "Inauguracion",
			"allDay" : false,
			"start" : "2015-11-04T12:00:00",
			"end": "2015-11-04T16:00:00"
		},
		{
			"title" : "Cena",
			"allDay" : false,
			"start" : "2015-11-04T19:00:00",
			"end": "2015-11-04T22:00:00"
		}
	]);
});

app.use('/eventos/:eventId/comments', function(req, res) {
	res.send([
		{
			"name" : "Juan",
			"text" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
		},

		{
			"name" : "Matria",
			"text" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
		},

		{
			"name" : "Maddria",
			"text" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
		},

		{
			"name" : "Jutan",
			"text" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
		},

		{
			"name" : "Maria",
			"text" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
		},

		{
			"name" : "Moaria",
			"text" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
		},

		{
			"name" : "Juana",
			"text" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
		},

		{
			"name" : "Mariana",
			"text" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
		},

		{
			"name" : "Mariari",
			"text" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
		},

		{
			"name" : "Juan",
			"text" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
		},

		{
			"name" : "Mariachi",
			"text" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
		},

		{
			"name" : "Marias",
			"text" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
		},

		{
			"name" : "Juanes",
			"text" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
		},

		{
			"name" : "Mariaf",
			"text" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
		},

		{
			"name" : "SATANSAs",
			"text" : "Lorem Ipsum is asdasdasdasasdas dasd asdsimply dummy text of the printing and typesetting industry. and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
		},

	]);
});


app.use('/markerTypes', function(req, res) {
	res.send({
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
	});
});




app.use('/eventos/:eventId/markers', function(req, res) {
	res.send([
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
	]);
});

app.use('/eventos/:eventId', function(req, res) {
	res.send({
		"description" : "Este evento el mejor evento EL EVENTO DE COMIDAS MAS GRANDE DE LATINAMERICA PUNTO. no hay mas no le piensen chavos es el mejor evento el cumpleanos de quiero vivir en america venga hay cheve y concirtos y tortas del tipo ahogado y deliciosas It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		"id" : 1	
	});
});


app.use(express.static(__dirname));
// correr el servidor
const server = http.createServer(app).listen(port, function() {
	console.log('Servidor express creado en puerto ' + port);
});
