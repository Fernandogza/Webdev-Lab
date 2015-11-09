// GET /eventos/:eventId/rsvps

var attendantsN = [];

var pageNumberRSVP = 1;

var PER_PAGE_RSVP = 4;



$(document).ready(function() {
	//$("#radioRSVP").click(submitRSVP);
	//attendants.forEach(addRSVP);
});
var users;
function loadRSVPsAjax(idEvento) {
	$.get('/api/user/', setUsers);

	$.get('/api/event/'+idEvento+'/rsvp/', loadPageRSVP);
}

function setUsers(usr){
	users=JSON.parse(usr)['data'];
	$.get('/api/event/'+idEvento+'/rsvp/', loadPageRSVP);
}
function getUser(id){
	var x=0;
	for(x=0; x<users.length; x++){
		if(users[x].id == id){
			break;
		}
	}
	return users[x].first_name
}
function submitRSVP(el) {
	var ev = getUrlParameter('id');
	var s;
	if (el ==1) {
		s="going";
	}else if (el ==2){
		s="maybe";
	}else{
		s="not going";

	}
	$.ajax({
		  url: "/api/rsvp",
		  method: "PUT",
		  data: { idEvent: ev, idUser:20, status:s},
		  dataType: "html"
	});
	addRSVP({name: getUser(20), attending: s});
}


function addRSVP(attendant){

	attendantsN.push({ "name": attendant.name, "attending": attendant.attending});
	$("#attendants").empty();
	loadPage(pageNumberRSVP, attendantsN, PER_PAGE_RSVP, genRSVP, insertRSVP, createPaginationRSVP);
	// var text = 
	// 	'<tr><td>' +
	// 	attendant.name +
	// 	'</td><td>' +
	// 	attendant.attending + 
	// 	'</td></tr>';
	// $("#attendants").append(text);

	return;
}






function gotoPageRSVP(pageNum){

	pageNumberRSVP = pageNum;
	$("#attendants").empty();

	loadPage(pageNumberRSVP, attendantsN, PER_PAGE_RSVP, genRSVP, insertRSVP, createPaginationRSVP);
}

function loadPageRSVP(attendants2){
	var att= JSON.parse(attendants2)['data'];
	att.forEach(function(element, index, array){
		var name= getUser(element.id_user);
		attendantsN.push({ "name": name, "attending": element.status});
		//attendants.push( { "name": getUser(element.id_user), "attending": element.status});
	});
	$("#attendants").empty();

	loadPage(pageNumberRSVP, attendantsN, PER_PAGE_RSVP, genRSVP, insertRSVP, createPaginationRSVP);
}

function previousPageRSVP(){

	pageNumberRSVP--;
	$("#attendants").empty();

	loadPage(pageNumberRSVP, attendantsN, PER_PAGE_RSVP, genRSVP, insertRSVP, createPaginationRSVP);
}
function nextPageRSVP(){

	pageNumberRSVP++;
	$("#attendants").empty();

	loadPage(pageNumberRSVP, attendantsN, PER_PAGE_RSVP, genRSVP, insertRSVP, createPaginationRSVP);
}






function createPaginationRSVP(){
	var totalPages = Math.floor((attendantsN.length) / PER_PAGE_RSVP);

	if( (attendantsN.length) % PER_PAGE_RSVP > 0 ) totalPages ++;

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





