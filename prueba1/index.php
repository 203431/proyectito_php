<?php
    require_once "conexion.php";
    $query= "INSERT INTO usuario(email,pass) 
    VALUES('proyectito@gmail.com','1234') ";
    consulta_bd($query);
?>

   