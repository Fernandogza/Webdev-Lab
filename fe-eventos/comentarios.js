// GET /eventos/:eventId/comments

var comments = [
	{
		"name" : "Juan",
		"text" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},

	{
		"name" : "Maria",
		"text" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},

	{
		"name" : "Maria",
		"text" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	}
];


$(document).ready(function() {
		document.getElementById("commentButton").onclick = addComment;

});


function addComment(){
	var name, msg;
	name = "Jorge";
	msg = $("#textarea1").val();

	var text;
	text = '<div class="row"><div class="col s1"><p><i class="material-icons">play_arrow</i></p></div><div class="col s2"><p>Jorge</p></div><div class="col s9"><p>'+msg+'</p></div></div>';


	$("#comentarios").append(text);


	$("#textarea1").val('');

	return;
}


