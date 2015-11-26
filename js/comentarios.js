// GET /eventos/:eventId/comments

var comments = [];


var pageNumberComments = 1;

var PER_PAGE_COMMENTS = 5;

var cont = 0;

$(document).ready(function() {
	$("#commentButton").click(submitComment);
});

function loadComentariosAjax(idEvento) {
	$.get('api/event/' + idEvento + '/blog', loadPageComments);
}


function submitComment() {

	var input = document.getElementById("comentarioNuevo").value;
	input = input.trim();
	if (input){
    	$.get('api/cuser', function(user) {
			var json = JSON.parse(user);
			
			user = json.data[0].first_name;
			idUsuario = json.data[0].id;
			idEvento = getUrlParameter('id');

			addComment({idEvento: idEvento, idUsuario: idUsuario, name: user, text: $('#comentarioNuevo').val()});
			$('#comentarioNuevo').val('')
		});
	} 
}


function addComment(comment){
	$.ajax({
		url: "/api/blog",
	  	method: "PUT",
	  	data: { idEvent: comment.idEvento, idUser: comment.idUsuario, text: comment.text},
	  	dataType: "html",
	  	success: function(){
	        
	        var text = '<div class="row"><div class="col s1"><p><i class="material-icons">play_arrow</i>' 
			+ '</p></div><div class="col s2"><p>' 
			+ comment.name 
			+ '</p></div><div class="col s9"><p>' 
			+ comment.text
			+ '</p></div></div>';


			$("#comentarios").append(text);
	    }
	});
	return;
}


function createPaginationComments(){
	var totalPages = Math.floor( (comments.length) / PER_PAGE_COMMENTS );

	if( (comments.length) % PER_PAGE_COMMENTS > 0 ) totalPages ++;

	$("#commentPagination").empty();

	var rightArrow = leftArrow = "waves-effect";
	var rightOnclick = "onclick=nextPageComments()";
	var leftOnclick = "onclick=previousPageComments()";

	if(pageNumberComments >= totalPages){
		rightArrow = "disabled";
		rightOnclick = "";
	}
	if (pageNumberComments == 1) {
		leftArrow = "disabled";
		leftOnclick = "";
	};


	$("#commentPagination").append('<li ' + leftOnclick + ' id="backCommentPagination" class="' + leftArrow + '"><a ><i class="material-icons">chevron_left</i></a></li>');
	

	for (var i = 1; i <= totalPages; i++) {

		if(i==pageNumberComments){
			active = "active";
		} else {
			active = "waves-effect";
		}
		// $("#commentPagination").append('<li class="'+ active +'"><a onclick=gotoPageComments(' + i + ')>' + i + '</a></li>');
		$("#commentPagination").append('<li  onclick=gotoPageComments(' + i + ') class="'+ active +'"><a >' + i + '</a></li>');
	};



	$("#commentPagination").append('<li ' + rightOnclick + ' id="nextCommentPagination" class="' + rightArrow + '"><a ><i class="material-icons">chevron_right</i></a></li>');
}

function loadPageComments(comment){
	var jsonComment = JSON.parse(comment);
	comments = jsonComment.data;
	$("#comentarios").empty();
	cont = 0;

	loadPage(pageNumberComments, comments, PER_PAGE_COMMENTS, genComment, insertComment, createPaginationComments);
}

function previousPageComments(){

	console.log("previous" + pageNumberComments);

	pageNumberComments--;
	$("#comentarios").empty();

	loadPage(pageNumberComments, comments, PER_PAGE_COMMENTS, genComment, insertComment, createPaginationComments);
}
function nextPageComments(){

	console.log("next" + pageNumberComments);

	pageNumberComments++;
	$("#comentarios").empty();

	loadPage(pageNumberComments, comments, PER_PAGE_COMMENTS, genComment, insertComment, createPaginationComments);
}

function gotoPageComments(pageNum){

	pageNumberComments = pageNum;
	$("#comentarios").empty();

	loadPage(pageNumberComments, comments, PER_PAGE_COMMENTS, genComment, insertComment, createPaginationComments);
}

function loadPage(pageNum, array, limit, gen_function, insert_function, pagination_function){

	var count = 0;

	for (var i = limit * (pageNum - 1); i < array.length && count < limit; i++, count++) {
		insert_function( gen_function(array[i]) );
	};


	pagination_function();
}

function insertComment(commentDiv){

	$("#comentarios").append(commentDiv);

	return;
}


function getUserName(id, num){
	$.get('api/user/' + id, function(user) {
		var json = JSON.parse(user);
		user = json.data[0].first_name;
		$('#comentario'+num).html(user);
	});
}

function genComment(comment){
var text = '<div class="row"><div class="col s1"><p><i class="material-icons">play_arrow</i>' 
	+ '</p></div><div class="col l2 s4"><p style="word-wrap: break-word;" id="comentario'+cont+'">' 
	+ '</p></div><div class="col l9 s7"><p style="word-wrap: break-word;">' 
	+ comment.text
	+ '</p></div></div>';

	getUserName(comment.id_user,cont);

	cont++;


	return text;
}