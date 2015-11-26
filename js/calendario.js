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

	            	console.log('acsts', actividads);

		for(var i = 0; i < actividads.length; i++) {
			var eventId = json.data[i].id;
			var eventStart = json.data[i].start_date;
			var eventEnd = json.data[i].end_date;
			var eventTitle = json.data[i].name;
			var eventDescription = json.data[i].description;
			var newEvent = {
				title : eventTitle,
				allDay : false,
				description: eventDescription,
				conferenceId: eventId,
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
			defaultView: 'basicWeek',
			events: calendar,
			eventClick: function(data, event, view) {
				//set the values and open the modal
				console.log(data);
				$("#calendarioTitulo").html("Actividad: " + data.title);
				$("#calendarioTituloFechaIni").html(moment(data.start, 'X').utcOffset(0).format('YYYY-MM-DD hh:mm A'));
				$("#calendarioTituloFechaFin").html(moment(data.end, 'X').utcOffset(0).format('YYYY-MM-DD hh:mm A'));
		        $("#calendarioDescripcion").html(data.description);
		        $("#modal1").openModal();
			}
		});

    	gotoStartDate(calendar);

    	loadEvento_list(actividads);

    });

}


function loadEvento_list (actividads) {
	var text = "";
	for (var i = 0; i < actividads.length; i++) {
		(function(i){
		text = '<tr>'
		    		+ '<td>'
		    			+ '<input type="checkbox" id="eventoChkAsistir'+ i + '" />'
 						+ '<label for="eventoChkAsistir'+ i + '">Asisitire</label>'
 					+ '</td>'
 					+ '<td>'
 						+ '<span> ' + actividads[i].name +  '</span>'
 					+ '</td>'
 					+ '<td>'
 						+ '<span>' + actividads[i].description + '</span>'
 					+ '</td>'
 					+ '<td>'
 						+ '<span>' + moment(actividads[i].start_date, 'X').utcOffset(0).format('YYYY-MM-DD hh:mm A') + ' - </span><br>'
 						+ '<span>' + moment(actividads[i].end_date, 'X').utcOffset(0).format('YYYY-MM-DD hh:mm A')  +  '</span>'
 					+ '</td>'
		    	+ '</tr>';
		$('#event_list').append(text);
		$('#eventoChkAsistir'+i).click(function(){
			var self = this;
			// if (!$(this).is(':checked')) {
			console.log('act', actividads, i);
	            $.get('api/cuser', function(user) {
	            	var json = JSON.parse(user);

					var user = json.data[0].first_name;
					var idUsuario = json.data[0].id;
					var idEvento = getUrlParameter('id');
	            	var conferenceId = actividads[i].id;

	            	console.log();

	            	$.ajax({
						url: '/api/personalschedule/' + conferenceId + '/user/' + idUsuario,
					  	method: $(self).is(':checked') ? "PUT" : 'DELETE',
					  	data: { startDate: actividads[i].start_date,
					  			endDate: actividads[i].end_date,
					  			name: actividads[i].name,
					  			description: actividads[i].description },
					  	success: function(){
					        console.log('exito al guardar asistencia');
					    }
					});
	            });



		});

	})(i);
	}


}
