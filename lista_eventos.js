// var query = {};


// $(function() {
//     $.mockjax({
//         url: '*',
//         response: ExampleData.pagedReponse,
//         responseTime: 0
//     });

//     $('#demo-table').simple_datagrid();
	
// 	/*$.get('/eventos?' + $.param(query), function(eventos) {
//     	console.log(eventos);
		
// 		ExampleData.eventos = eventos;
// 		$('#demo-table').simple_datagrid();
//     });*/
	
// });

// ExampleData = {};

// ExampleData.pagedReponse = function(settings) {
//     // Return mockjax response; handle paging and sorting
//     var page = settings.data.page || 1;
//     var order_by = settings.data.order_by;
//     var sortorder = settings.data.sortorder;

// 	var rows_per_page = 5;
// 	var start_index = (page - 1) * rows_per_page;

// 	var total_pages = 1;
// 	var data = ExampleData.eventos;
// 	if (data.length != 0) {
// 		total_pages = parseInt((data.length - 1) / rows_per_page) + 1;
// 	}

// 	if (order_by) {
// 		data.sort(function(left, right) {
// 			var a = left[order_by];
// 			var b = right[order_by];

// 			if (sortorder == 'desc') {
// 				var c = b;
// 				b = a;
// 				a = c;
// 			}

// 			if (a < b) {
// 				return -1;
// 			}
// 			else if (a > b) {
// 				return 1;
// 			}
// 			else {
// 				return 0;
// 			}
// 		});
// 	}

// 	var result = {
// 		total_pages: total_pages,
// 		rows: data.slice(start_index, start_index + rows_per_page)
// 	};
//     this.responseText = result;
// };

// ExampleData.eventos = [{
//     "foto": "img/Expotec2015.jpg",
//     "nombre": "Expotec",
// 	"lugar": "Estacionamiento E3",
//     "fecha": "2015-10-23",
// 	"estatus": "Asistire",
// 	"liga": "1"
// },
// {
//     "foto": "img/empleatec.jpg",
//     "nombre": "Empleatec",
// 	"lugar": "Centro Estudiantil",
//     "fecha": "2015-09-10",
// 	"estatus": "No Asistire",
// 	"liga": "2"
// },
// {
//     "foto": "img/raices.jpg",
//     "nombre": "Raices",
// 	"lugar": "Auditorio Luis Elizondo",
//     "fecha": "2015-12-25",
// 	"estatus": "Talvez Asistire",
// 	"liga": "3"
// }
// ];

var eventos = [
{
    "foto": "img/Expotec2015.jpg",
    "nombre": "Expote222c",
	"lugar": "Estacionamiento E3",
    "fecha": "2015-10-23",
	"estatus": "Asistire222",
	"liga": "1"
},
{
    "foto": "img/empleatec.jpg",
    "nombre": "Empleatec",
	"lugar": "Centro Estudiantil",
    "fecha": "2015-09-10",
	"estatus": "No Asistire",
	"liga": "2"
},
{
    "foto": "img/raices.jpg",
    "nombre": "Raices",
	"lugar": "Auditorio Luis Elizondo",
    "fecha": "2015-12-25",
	"estatus": "Talvez Asistire",
	"liga": "3"
},{
    "foto": "img/Expotec2015.jpg",
    "nombre": "Expotec",
	"lugar": "Estacionamiento E3",
    "fecha": "2015-10-23",
	"estatus": "Asistire",
	"liga": "1"
},
{
    "foto": "img/empleatec.jpg",
    "nombre": "Empleatec",
	"lugar": "Centro Estudiantil",
    "fecha": "2015-09-10",
	"estatus": "No Asistire",
	"liga": "2"
},
{
    "foto": "img/raices.jpg",
    "nombre": "Raices",
	"lugar": "Auditorio Luis Elizondo",
    "fecha": "2015-12-25",
	"estatus": "Talvez Asistire",
	"liga": "3"
},{
    "foto": "img/Expotec2015.jpg",
    "nombre": "Expotec",
	"lugar": "Estacionamiento E3",
    "fecha": "2015-10-23",
	"estatus": "Asistire",
	"liga": "1"
},
{
    "foto": "img/empleatec.jpg",
    "nombre": "Empleatec",
	"lugar": "Centro Estudiantil",
    "fecha": "2015-09-10",
	"estatus": "No Asistire",
	"liga": "2"
},
{
    "foto": "img/raices.jpg",
    "nombre": "Raices",
	"lugar": "Auditorio Luis Elizondo",
    "fecha": "2015-12-25",
	"estatus": "Talvez Asistire",
	"liga": "3"
},{
    "foto": "img/Expotec2015.jpg",
    "nombre": "Expotec",
	"lugar": "Estacionamiento E3",
    "fecha": "2015-10-23",
	"estatus": "Asistire",
	"liga": "1"
},
{
    "foto": "img/empleatec.jpg",
    "nombre": "Empleatec",
	"lugar": "Centro Estudiantil",
    "fecha": "2015-09-10",
	"estatus": "No Asistire",
	"liga": "2"
},
{
    "foto": "img/raices.jpg",
    "nombre": "Raices",
	"lugar": "Auditorio Luis Elizondo",
    "fecha": "2015-12-25",
	"estatus": "Talvez Asistire",
	"liga": "3"
},
];


var pageNumberEvents = 1;

var PER_PAGE_EVENTS = 5;

$(document).ready(function() {

	loadPageEvents();
});










function createPaginationEvents(){
	var totalPages = Math.floor( (eventos.length) / PER_PAGE_EVENTS );

	if( (eventos.length) % PER_PAGE_EVENTS > 0 ) totalPages ++;

	$("#eventListPagination").empty();

	var rightArrow = leftArrow = "waves-effect";
	var rightOnclick = "onclick=nextPageEvents()";
	var leftOnclick = "onclick=previousPageEvents()";

	if(pageNumberEvents >= totalPages){
		rightArrow = "disabled";
		rightOnclick = "";
	}
	if (pageNumberEvents == 1) {
		leftArrow = "disabled";
		leftOnclick = "";
	};


	$("#eventListPagination").append('<li ' + leftOnclick + ' class="' + leftArrow + '"><a ><i class="material-icons">chevron_left</i></a></li>');
	

	for (var i = 1; i <= totalPages; i++) {

		if(i==pageNumberEvents){
			active = "active";
		} else {
			active = "waves-effect";
		}
		$("#eventListPagination").append('<li  onclick=gotoPageEvents(' + i + ') class="'+ active +'"><a >' + i + '</a></li>');
	};



	$("#eventListPagination").append('<li ' + rightOnclick + ' class="' + rightArrow + '"><a ><i class="material-icons">chevron_right</i></a></li>');
}

function loadPageEvents(){

	$("#eventList").empty();

	loadPage(pageNumberEvents, eventos, PER_PAGE_EVENTS, genEvent, insertEvent, createPaginationEvents);
}

function previousPageEvents(){

	pageNumberEvents--;
	$("#eventList").empty();

	loadPage(pageNumberEvents, eventos, PER_PAGE_EVENTS, genEvent, insertEvent, createPaginationEvents);
}
function nextPageEvents(){

	pageNumberEvents++;
	$("#eventList").empty();

	loadPage(pageNumberEvents, eventos, PER_PAGE_EVENTS, genEvent, insertEvent, createPaginationEvents);
}

function gotoPageEvents(pageNum){

	pageNumberEvents = pageNum;
	$("#eventList").empty();

	loadPage(pageNumberEvents, eventos, PER_PAGE_EVENTS, genEvent, insertEvent, createPaginationEvents);
}

function loadPage(pageNum, array, limit, gen_function, insert_function, pagination_function){

	var count = 0;

	for (var i = limit * (pageNum - 1); i < array.length && count < limit; i++, count++) {
		insert_function( gen_function(array[i]) );
	};

	pagination_function();
}

function insertEvent(eventDiv){

	$("#eventList").append(eventDiv);

	return;
}

function genEvent(evento){

		var text = '<tr><td class="sdg-col_foto"> <img src="' + evento.foto  +  '" style="vertical-align:middle;width:100%"></td>' + 
					'<td class="sdg-col_nombre">' + evento.nombre +  '</td>' + 
					'<td class="sdg-col_lugar">' + evento.lugar +  '</td>' + 
					'<td class="sdg-col_fecha">' + evento.fecha +  '</td>' + 
					'<td class="sdg-col_estatus">' + evento.estatus +  '</td>' + 
					'<td class="sdg-col_liga"><a href="evento.html?id=' + evento.liga + '">Ver</a> <a></a> </td> <td class="sdg-col__"></td></tr>';

		return text;
}

var dataSet = [
    [ "Expotec", "Estacionamiento E3", "2015-10-23", "Asistire" ],
    [ "Expotec", "Estacionamiento E3", "2015-10-23", "Asistire"  ],
    [ "Expotec", "Estacionamiento E3", "2015-10-23", "Asistire" ],
    [ "Expotec", "Estacionamiento E3", "2015-10-23", "Asistire"  ],
    [ "Expotec", "Estacionamiento E3", "2015-10-23", "Asistire" ],
    [ "Expotec", "Estacionamiento E3", "2015-10-23", "Asistire" ],
    [ "Expotec", "Estacionamiento E3", "2015-10-23", "Asistire" ],
    [ "Expotec", "Estacionamiento E3", "2015-10-23", "Asistire"  ],
    [ "Expotec", "Estacionamiento E3", "2015-10-23", "Asistire" ],
    [ "Expotec", "Estacionamiento E3", "2015-10-23", "Asistire"  ],
    [ "Expotec", "Estacionamiento E3", "2015-10-23", "Asistire" ],
    [ "Expotec", "Estacionamiento E3", "2015-10-23", "Asistire" ],
    [ "Expotec", "Estacionamiento E3", "2015-10-23", "Asistire" ],
    [ "Expotec", "Estacionamiento E3", "2015-10-23", "Asistire"  ],
    [ "Expotec", "Estacionamiento E3", "2015-10-23", "Asistire" ],
    [ "Expotec", "Estacionamiento E3", "2015-10-23", "Asistire"  ],
    [ "Expotec", "Estacionamiento E3", "2015-10-23", "Asistire" ],
    [ "Expotec", "Estacionamiento E3", "2015-10-23", "Asistire" ]
];
 
$(document).ready(function() {
	$
    var table=$('#example').DataTable( {
    	ajax: '/api/event/',
        columns: [
            { data: 'id' },
            { data: 'name' },
            {data: 'place' },
            { data: 'date' },
            { data: 'description' }
        ]
    } );

    $('#example tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');

            window.location.assign("evento.html?id="+$($('.selected').children()[0])[0].innerHTML);
        }
    } );
} );