<?php
include 'configuration.php';
include 'functions/functions.php';
$action = $_REQUEST['action'];

switch($action) {

	case "load":
		$query 	= mysql_query("SELECT * FROM `eventos` ORDER BY id ASC");
		$count  = mysql_num_rows($query);
		if($count > 0) {
			while($fetch = mysql_fetch_array($query)) {
				$record[] = $fetch;
			}
		}
		$department = array('Software Architect', 'Inventor', 'Programmer', 'Entrepreneur');
		?>
        <table class="as_gridder_table">
            <tr class="grid_header">
                <td><div class="grid_heading">EventNo</div></td>
                <td><div class="grid_heading">Nombre de evento</div></td>
                <td><div class="grid_heading">Descripcion</div></td>
                <td><div class="grid_heading">Lugar</div></td>
                <td><div class="grid_heading">Hora</div></td>
                <td><div class="grid_heading">Fecha</div></td>
                <td><div class="grid_heading">Actions</div></td>
            </tr>
            <tr id="addnew">
            	<td>&nbsp;</td>
            	<td colspan="6">
                <form id="gridder_addform" method="post">
                <input type="hidden" name="action" value="addnew" />
                <table width="100%">
                <tr>
                    <td><input type="text" name="name" id="name" class="gridder_add" /></td>
                    <td><input type="text" name="description" id="description" class="gridder_add" /></td>
                    <td><input type="text" name="place" id="place" class="gridder_add" /></td>
                    
                    <td><input type="text" name="date" id="date" class="gridder_add datepiker" /></td>
                    <td>&nbsp;
                    <input type="submit" id="gridder_addrecord" value="" class="gridder_addrecord_button" title="Add" />
                    <a href="cancel" id="gridder_cancel" class="gridder_cancel"><img src="images/delete.png" alt="Cancel" title="Cancel" /></a></td>
				</tr>
                </table>                    
                </form>
            </tr>
            <?php
            if($count <= 0) {
            ?>
            <tr id="norecords">
                <td colspan="7" align="center">No records found <a href="addnew" id="gridder_insert" class="gridder_insert"><img src="images/insert.png" alt="Add New" title="Add New" /></a></td>
            </tr>
            <?php } else {
            $i = 0;
            foreach($record as $records) {
            $i = $i + 1;
            ?>
            <tr class="<?php if($i%2 == 0) { echo 'even'; } else { echo 'odd'; } ?>">
                <td><div class="grid_content sno"><span><?php echo $i; ?></span></div></td>
                <td><div class="grid_content editable"><span><?php echo $records['name']; ?></span><input type="text" class="gridder_input" name="<?php echo encrypt("name|".$records['idAdmin']); ?>" value="<?php echo $records['name']; ?>" /></div></td>
                <td><div class="grid_content editable"><span><?php echo $records['description']; ?></span><input type="text" class="gridder_input" name="<?php echo encrypt("description|".$records['idAdmin']); ?>" value="<?php echo $records['description']; ?>" /></div></td>
                <td><div class="grid_content editable"><span><?php echo $records['place']; ?></span><input type="text" class="gridder_input" name="<?php echo encrypt("place|".$records['idAdmin']); ?>" value="<?php echo $records['place']; ?>" /></div></td>
                <td><div class="grid_content editable"><span><?php echo date("Y-m-d H:i:s", strtotime($records['date'])); ?></span><input type="text" class="gridder_input datepicker" name="<?php echo encrypt("date|".$records['idAdmin']); ?>" value="<?php echo date("Y/m/d", strtotime($records['date'])); ?>" /></div></td>
                <td>
                <a href="gridder_addnew" id="gridder_addnew" class="gridder_addnew"><img src="images/insert.png" alt="Add New" title="Add New" /></a>
                <a href="<?php echo encrypt($records['idAdmin']); ?>" class="gridder_delete"><img src="images/delete.png" alt="Delete" title="Delete" /></a></td>
            </tr>
            <?php
                }
            }
            ?>
            </table>
        <?php
	break;
	
	case "addnew":
		$name 		= isset($_POST['name']) ? mysql_real_escape_string($_POST['name']) : '';
		$lname 		= isset($_POST['description']) ? mysql_real_escape_string($_POST['description']) : '';
		$age 		= isset($_POST['place']) ? mysql_real_escape_string($_POST['place']) : '';
		
		$date 		= isset($_POST['date']) ? mysql_real_escape_string($_POST['date']) : '';
		mysql_query("INSERT INTO `eventos` (name, description, place, date) VALUES ('$name', '$description', '$place', '$date')");
	break;
	
	
	case "update":
		$value 	= $_POST['value'];
		$crypto = decrypt($_POST['crypto']);
		$explode = explode('|', $crypto);
		$columnName = $explode[0];
		$rowId = $explode[1];
		if($columnName == 'date') { // Check the column is 'date', if yes convert it to date format
			$datevalue = $value;
			$value 	   = date('Y-m-d', strtotime($datevalue));
		}
		$query = mysql_query("UPDATE `eventos` SET `$columnName` = '$value' WHERE id = '$rowId' ");
	break;
	
	case "delete":
		$value 	= decrypt($_POST['value']);
		$query = mysql_query("DELETE FROM `eventos` WHERE id = '$value' ");
	break;
}
?>