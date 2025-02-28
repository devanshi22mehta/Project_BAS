<?php

// /* Get the name of the uploaded file */
// $filename = $_FILES['file']['name'];

// /* Choose where to save the uploaded file */
// $location = "upload/".$filename;

// /* Save the uploaded file to the local filesystem */
// if ( move_uploaded_file($_FILES['file']['tmp_name'], $location) ) { 
//   echo 'Success'; 
// } else { 
//   echo 'Failure'; 
// }

?>


<?php
if (!empty($_FILES['files']['name'][0])) {
    foreach ($_FILES['files']['tmp_name'] as $key => $tmp_name) {
        $file_name = $_FILES['files']['name'][$key];
        move_uploaded_file($tmp_name, "uploads/" . $file_name);
    }
    echo "Files uploaded successfully!";
}
?>
