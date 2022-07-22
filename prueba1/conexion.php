<?php
    function consulta_bd($query){
        $mysqli= new mysqli("localhost","root","","datos_proyectito");
        if(mysqli_connect_errno()){
            echo "Problemas para conectar a BD";
        }
        $mysqli->set_charset("utf8");
        $mysqli->autocommit(FALSE);
        $mysqli->begin_transaction(MYSQLI_TRANS_START_WITH_CONSISTENT_SNAPSHOT);
        if($consulta=$mysqli->query($query)){
            if($mysqli->commit()){

                echo "Datos guardados";
            }else{
                echo "No se guardaron los datos";
            }
        }else{
            $mysqli->rollback();
            echo "Error, datos no guardados";
        }
        return $consulta;
    }
?>