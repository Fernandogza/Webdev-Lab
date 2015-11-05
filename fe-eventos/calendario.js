// GET /eventos/:eventId/calendar

var calendar = [
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
];


function gotoStartDate(){
	var ev_start = calendar.events[0].start;

	var ev_end = calendar.events[0];

	for (var i = 1; i < calendar.events.length; i++) {
		ev_end = (calendar.events[i] > ev_end) ? calendar.events[i]:ev_end;
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

    // page is now ready, initialize the calendar...

    $('#calendar').fullCalendar({
				lang: 'es',

				header: {
					left: 'prev,next today',
					center: 'title',
					right: 'month,agendaWeek,agendaDay'
				},
				defaultView: 'agendaWeek',
				events: calendar;
    })

});