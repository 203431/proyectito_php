<?php
include('../login/bd.php');

$email=$_POST['email'];
$pass=$_POST['pass'];



$consulta="SELECT*FROM user where email ='$email' and pass='$pass'";
$resultado=mysqli_query($conexion,$consulta);

$filas=mysqli_num_rows($resultado);

if($filas){
  
    header("location:../menu/navbar.php");

}else{
    ?>
    <?php
    include("index.html");

  ?>
  <h1 class="bad">Datos incorrectos</h1>
  <?php
}
mysqli_free_result($resultado);
mysqli_close($conexion);
