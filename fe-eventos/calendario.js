// GET /eventos/:eventId/calendar

var calendar = [
	{
		"title" : "Inauguracion",
		"allDay" : false,
		"start" : "2015-11-14T12:00:00",
		"end": "2015-11-14T16:00:00"
	},
	{
		"title" : "Cena",
		"allDay" : false,
		"start" : "2015-11-14T19:00:00",
		"end": "2015-11-14T22:00:00"
	}
];


function gotoStartDate(events){
	var ev_start = events[0].start;

	var ev_end = events[0].end;
	// alert(ev_end);

	for (var i = 1; i < events.length; i++) {
		ev_end = (events[i].end > ev_end) ? events[i].end:ev_end;
	};


	var todate = new Date();
	var today = todate.toJSON();


	if(ev_start >= today){

	

		$('#calendar').fullCalendar('gotoDate', ev_start);

	} else if( ev_end >= today){


		$('#calendar').fullCalendar('gotoDate', today);

	} else {


		$('#calendar').fullCalendar('gotoDate', ev_start);
	
	}
}

$(document).ready(function() {

    // page is now ready, initialize the ..

    $('#calendar').fullCalendar({
				lang: 'es',

				header: {
					left: 'prev,next today',
					center: 'title',
					right: 'month,agendaWeek,agendaDay'
				},
				defaultView: 'agendaWeek',
				//events: calendar
    })

    $.get('/eventos/' + idEvento + '/calendar', function(eventos) {
    	console.log(eventos);
    	eventos.forEach(function(evento) {
    		$('#calendar').fullCalendar('renderEvent', evento);
    	});
    	gotoStartDate(eventos);

    });

});