<?php
include 'configuration.php';
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Eventos</title>
<meta name="keywords" content="onclick edit jquery php, grid in php, onclick change text box in jquery, onclick edit table row, insert update delete using jquery ajax, simple php data grid" />
<meta name="description" content="This article is about simple grid system using PHP, jQuery. Insert a new record to the table using by normal Ajax PHP. It will show the editable textbox when user clicks on the label." />
<link rel="stylesheet" type="text/css" href="css/style.css" />
<link rel="stylesheet" href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">
<script type="text/javascript" src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
<script type="text/javascript">
$(function(){
	
	// Function for load the grid
	function LoadGrid() {
		var gridder = $('#as_gridder');
		var UrlToPass = 'action=load';
		gridder.html('loading..');
		$.ajax({
			url : 'ajax.php',
			type : 'POST',
			data : UrlToPass,
			success: function(responseText) {
				gridder.html(responseText);
			}
		});
	}
	
	// Seperate Function for datepiker() to save the value
	function ForDatePiker(ThisElement) {
		ThisElement.prev('span').html(ThisElement.val()).prop('title', ThisElement.val());
		var UrlToPass = 'action=update&value='+ThisElement.val()+'&crypto='+ThisElement.prop('name');
		$.ajax({
			url : 'ajax.php',
			type : 'POST',
			data : UrlToPass
		});
	}
	
	LoadGrid(); // Load the grid on page loads
	
	
	// Execute datepiker() for date fields
	$("body").delegate("input[type=text].datepicker", "focusin", function(){
		var ThisElement = $(this);
		$(this).datepicker({
	   		dateFormat: 'yy/mm/dd',
			onSelect: function() {
				setTimeout(ForDatePiker(ThisElement), 500);
			}
	   });
	});
	
	// Show the text box on click
	$('body').delegate('.editable', 'click', function(){
		var ThisElement = $(this);
		ThisElement.find('span').hide();
		ThisElement.find('.gridder_input').show().focus();
	});
	
	// Pass and save the textbox values on blur function
	$('body').delegate('.gridder_input', 'blur', function(){
		var ThisElement = $(this);
		ThisElement.hide();
		ThisElement.prev('span').show().html($(this).val()).prop('title', $(this).val());
		var UrlToPass = 'action=update&value='+ThisElement.val()+'&crypto='+ThisElement.prop('name');
		if(ThisElement.hasClass('datepicker')) {
			return false;
		}
		$.ajax({
			url : 'ajax.php',
			type : 'POST',
			data : UrlToPass
		});
	});
	
	// Same as the above blur() when user hits the 'Enter' key
	$('body').delegate('.gridder_input', 'keypress', function(e){
		if(e.keyCode == '13') {
			var ThisElement = $(this);
			ThisElement.hide();
			ThisElement.prev('span').show().html($(this).val()).prop('title', $(this).val());
			var UrlToPass = 'action=update&value='+ThisElement.val()+'&crypto='+ThisElement.prop('name');
			if(ThisElement.hasClass('datepicker')) {
				return false;
			}
			$.ajax({
				url : 'ajax.php',
				type : 'POST',
				data : UrlToPass
			});
		}
	});
	
	// Function for delete the record
	$('body').delegate('.gridder_delete', 'click', function(){
		var conf = confirm('Are you sure want to delete this record?');
		if(!conf) {
			return false;
		}
		var ThisElement = $(this);
		var UrlToPass = 'action=delete&value='+ThisElement.attr('href');
		$.ajax({
			url : 'ajax.php',
			type : 'POST',
			data : UrlToPass,
			success: function() {
				LoadGrid();
			}
		});
		return false;
	});
	
	
	// Add new record
	
	// Add new record when the table is empty
	$('body').delegate('.gridder_insert', 'click', function(){
		$('#norecords').hide();
		$('#addnew').slideDown();
		return false;
	});
	
	
	// Add new record when the table in non-empty
	$('body').delegate('.gridder_addnew', 'click', function(){
		$('html, body').animate({ scrollTop: $('.as_gridder').offset().top}, 250); // Scroll to top gridder table
		$('#addnew').slideDown();
		return false;
	});
	
	// Cancel the insertion
	$('body').delegate('.gridder_cancel', 'click', function(){
		LoadGrid()
		return false;
	});
	
	// For datepiker
	$("body").delegate(".gridder_add.datepiker", "focusin", function(){
		var ThisElement = $(this);
		$(this).datepicker({
	   		dateFormat: 'yy/mm/dd'
	   });
	});
	
	// Pass the values to ajax page to add the values
	$('body').delegate('#gridder_addrecord', 'click', function(){
		
		// Do insert vaidation here
		if($('#fname').val() == '') {
			$('#fname').focus();
			alert('Enter the Name');
			return false;
		}
		if($('#ldescription').val() == '') {
			$('#ldescription').focus();
			alert('Enter the Description');
			return false;
		}
		if($('#lplace').val() == '') {
			$('#lplace').focus();
			alert('Enter the Place');
			return false;
		}
		if($('#hour').val() == '') {
			$('#hour').focus();
			alert('Select the Hour');
			return false;
		}
		if($('#date').val() == '') {
			$('#date').focus();
			alert('Select the Date');
			return false;
		}
		
		// Pass the form data to the ajax page
		var data = $('#gridder_addform').serialize();
		$.ajax({
			url : 'ajax.php',
			type : 'POST',
			data : data,
			success: function() {
				LoadGrid();
			}
		});
		return false;
	});
	
});
</script>
</head>

<body>
<div class="as_wrapper">
	<h1 class="h1"><a href="">Eventos</a></h1>
	<div class="as_grid_container">
        <div class="as_gridder" id="as_gridder"></div> <!-- GRID LOADER -->
    </div>
</div>
</body>
</html>