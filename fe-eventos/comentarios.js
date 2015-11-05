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
		$("#commentButton").click(submitComment);

		comments.forEach(addComment);
});


function submitComment() {
	addComment({name: 'Jorge', text: $('#comentarioNuevo').val()});
	$('#comentarioNuevo').val('')
}


function addComment(comment){
	var text = '<div class="row"><div class="col s1"><p><i class="material-icons">play_arrow</i>' 
		+ '</p></div><div class="col s2"><p>' 
		+ comment.name 
		+ '</p></div><div class="col s9"><p>' 
		+ comment.text
		+ '</p></div></div>';


	$("#comentarios").append(text);

	return;
}



   

