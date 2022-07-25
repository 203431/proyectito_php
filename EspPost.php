<?php

include './conexion.php';

if ($con) {
    echo "Conexion con base de datos exitosa!";
    
	$temperatura = $_POST['temperatura'];

	$humedad = $_POST['humedad'];

	$humedad_suelo = $_POST['humedad_suelo'];

	$estado = $_POST['estado'];
			
	$fecha_actual = date('m-d-Y h:i:s a', time());
				
	$consulta = "INSERT INTO `plant_data`(`air_tem`, `hum_air`, `hum_floor`, `date`, `status_bomb`) VALUES ('$temperatura','$humedad','$humedad_suelo','$fecha_actual','$estado')";
				 
	$resultado = mysqli_query($con, $consulta);
	if ($resultado){
		echo " Registo en base de datos OK! ";
	} else {
		echo " Falla! Registro BD";
	}
} else {
    echo "Falla! conexion con Base de datos ";   
}


?>