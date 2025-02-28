<?php
$file = "uploads/" . $_GET['file'];
if (file_exists($file)) {
    unlink($file);
}
?>
