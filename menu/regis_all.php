<?php

 $conexion=mysqli_connect("localhost","root","","plant_check");

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="../css/css.css">
    <title>DATOS DE TODAS LAS MUESTRAS</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
</head>
<body>
    <div class="container__table">
                <div class= "table__title">Total de registros</div>
                <div class= "table__header">ID</div>
                <div class= "table__header">Temperatura del aire</div>
                <div class= "table__header">Humedad del aire</div>
                <div class= "table__header">Humedad del suelo</div>
                <div class= "table__header">Fecha</div>
                <div class= "table__header">Estado de la bomba</div>
            </tr>
            <?php
            $sql="SELECT * from plant_data ";
            $result=mysqli_query($conexion,$sql);

            while($mostrar=mysqli_fetch_array($result)){
            ?>
                <div class= "table__item"><?php echo $mostrar['id'] ?></div>
                <div class= "table__item"><?php echo $mostrar['air_tem'] ?></div>
                <div class= "table__item"><?php echo $mostrar['hum_air'] ?></div>
                <div class= "table__item"><?php echo $mostrar['hum_floor'] ?></div>
                <div class= "table__item"><?php echo $mostrar['date'] ?></div>
                <div class= "table__item"><?php echo $mostrar['status_bomb'] ?></div>
            </tr>
            <?php
            }
            ?>
    </div>

</body>
</html>