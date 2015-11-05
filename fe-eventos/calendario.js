// GET /eventos/:eventId/calendar

var calendar = {
	"view" : "week", // week, day, month

	"events" : [
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
	]
};

$(document).ready(function() {

    // page is now ready, initialize the calendar...

    $('#calendar').fullCalendar({
				lang: 'es',

				header: {
					left: 'prev,next today',
					center: 'title',
					right: 'month,agendaWeek,agendaDay'
				},
				defaultView: 'basicWeek',
				events: calendar.events
    })

});