var query = {};


$(function() {
    $.mockjax({
        url: '*',
        response: ExampleData.pagedReponse,
        responseTime: 0
    });

    $('#demo-table').simple_datagrid();
	
	/*$.get('/eventos?' + $.param(query), function(eventos) {
    	console.log(eventos);
		
		ExampleData.eventos = eventos;
		$('#demo-table').simple_datagrid();
    });*/
	
});

ExampleData = {};

ExampleData.pagedReponse = function(settings) {
    // Return mockjax response; handle paging and sorting
    var page = settings.data.page || 1;
    var order_by = settings.data.order_by;
    var sortorder = settings.data.sortorder;

	var rows_per_page = 5;
	var start_index = (page - 1) * rows_per_page;

	var total_pages = 1;
	var data = ExampleData.eventos;
	if (data.length != 0) {
		total_pages = parseInt((data.length - 1) / rows_per_page) + 1;
	}

	if (order_by) {
		data.sort(function(left, right) {
			var a = left[order_by];
			var b = right[order_by];

			if (sortorder == 'desc') {
				var c = b;
				b = a;
				a = c;
			}

			if (a < b) {
				return -1;
			}
			else if (a > b) {
				return 1;
			}
			else {
				return 0;
			}
		});
	}

	var result = {
		total_pages: total_pages,
		rows: data.slice(start_index, start_index + rows_per_page)
	};
    this.responseText = result;
};

ExampleData.eventos = [{
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
}
];