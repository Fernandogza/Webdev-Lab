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
	},
	
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
	},
	
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
	},
	
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
	},
	
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
	},
	
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
	},
	
];

var pageNumberRSVP = 1;

var PER_PAGE_RSVP = 4;



$(document).ready(function() {
	$("#radioRSVP").click(submitRSVP);
	//attendants.forEach(addRSVP);
});

function loadRSVPsAjax(idEvento) {
	$.get('/eventos/' + idEvento + '/rsvps', loadPageRSVP);
}


function submitRSVP() {
	addRSVP({name: 'Jorge', attending: $('#radioRSVP').val()});
}


function addRSVP(attendant){

	var text = 
		'<tr><td>' +
		attendant.name +
		'</td><td>' +
		attendant.attending + 
		'</td></tr>';
	$("#attendants").append(text);

	return;
}






function gotoPageRSVP(pageNum){

	pageNumberRSVP = pageNum;
	$("#attendants").empty();

	loadPage(pageNumberRSVP, attendants, PER_PAGE_RSVP, genRSVP, insertRSVP, createPaginationRSVP);
}

function loadPageRSVP(attendants){

	$("#attendants").empty();

	loadPage(pageNumberRSVP, attendants, PER_PAGE_RSVP, genRSVP, insertRSVP, createPaginationRSVP);
}

function previousPageRSVP(){

	pageNumberRSVP--;
	$("#attendants").empty();

	loadPage(pageNumberRSVP, attendants, PER_PAGE_RSVP, genRSVP, insertRSVP, createPaginationRSVP);
}
function nextPageRSVP(){

	pageNumberRSVP++;
	$("#attendants").empty();

	loadPage(pageNumberRSVP, attendants, PER_PAGE_RSVP, genRSVP, insertRSVP, createPaginationRSVP);
}






function createPaginationRSVP(){
	var totalPages = Math.floor((attendants.length) / PER_PAGE_RSVP);

	if( (attendants.length) % PER_PAGE_RSVP > 0 ) totalPages ++;

	$("#attendantsPagination").empty();

	var rightArrow = leftArrow = "waves-effect";
	var rightOnclick = "onclick=nextPageRSVP()";
	var leftOnclick = "onclick=previousPageRSVP()";

	console.log(pageNumberRSVP + " " + totalPages);
	if(pageNumberRSVP >= totalPages){
		rightArrow = "disabled";
		rightOnclick = "";
	}
	if (pageNumberRSVP == 1) {
		leftArrow = "disabled";
		leftOnclick = "";
	};


	$("#attendantsPagination").append('<li ' + leftOnclick + ' class="' + leftArrow + '"><a ><i class="material-icons">chevron_left</i></a></li>');
	

	for (var i = 1; i <= totalPages; i++) {

		if(i==pageNumberRSVP){
			active = "active";
		} else {
			active = "waves-effect";
		}
		$("#attendantsPagination").append('<li  onclick=gotoPageRSVP(' + i + ') class="'+ active +'"><a >' + i + '</a></li>');
	};



	$("#attendantsPagination").append('<li ' + rightOnclick + ' class="' + rightArrow + '" ><a ><i class="material-icons">chevron_right</i></a></li>');
}



function genRSVP(attendant){
	var text =  '<tr><td>'+
				attendant.name +
				'</td><td>'+
				attendant.attending
				+'</td> </tr>';

		return text;
}

function insertRSVP(attendantDIV){

	$("#attendants").append(attendantDIV);

	return;
}





