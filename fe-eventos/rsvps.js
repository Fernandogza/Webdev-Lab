// GET /eventos/:eventId/rsvps

var attendants = [
	{
		"name" : "Juan",
		"attending" : "Yes"
	},

	{
		"name" : "Maria",
		"attending" : "No"
	},

	{
		"name" : "Maria",
		"attending" : "Maybe"
	}
];



$(document).ready(function() {
	alert("ss");
		$("#commentButton").click(submitRSVP);

		attendants.forEach(addRSVP);
});


function submitRSVP() {
	addRSVP({name: 'Jorge', attending: $('#radioRSVP').val()});
	$('#radioRSVP').val('')
}


function addRSVP(attendant){

	var text =  '<tr><td>'+
				attendant.name+
				'</td><td>'+
				attendant.attending
				+'</td> </tr>';





	$("#attendants").append(text);

	return;
}


