// GET /eventos/:eventId/calendar

var calendar = [];

function gotoStartDate(events){

	var ev_start = events[0].start;
	var ev_end = events[0].end;
	 

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


function formatSeconds(seconds) {
		var date = new Date(seconds*1000);
		var iso = date.toISOString().match(/(\d{4}\-\d{2}\-\d{2})T(\d{2}:\d{2}:\d{2})/)
		return iso[1] + "T" + iso[2];			
}

function loadCalendarioAjax(idEvento) {

	$.get('api/event/' + idEvento + '/schedule', function(actividads) {
		
		var json = JSON.parse(actividads);

	    actividads = json.data;
		
		for(var i = 0; i < actividads.length; i++) {
			var eventId = json.data[i].id;
			var eventStart = json.data[i].start_date;
			var eventEnd = json.data[i].end_date;
			var eventTitle = json.data[i].name;
			var newEvent = {
				title : eventTitle,
				allDay : false,
				start: formatSeconds(eventStart),
				end: formatSeconds(eventEnd)
			};
			
			calendar[i] = newEvent;

			$('#calendar').fullCalendar('renderEvent', newEvent);
			
		}

		$('#calendar').fullCalendar({
			lang: 'es',

			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
			defaultView: 'agendaWeek',
			events: calendar,
			eventClick: function(data, event, view) {
				var content = '<h3>'+data.title+'</h3>' + 
					'<p><b>Start:</b> '+data.start+'<br />' + 
					(data.end && '<p><b>End:</b> '+data.end+'</p>' || '');

				tooltip.set({
					'content.text': content
				})
				.reposition(event).show(event);
			}
		});
		
    	gotoStartDate(calendar);

    });

}