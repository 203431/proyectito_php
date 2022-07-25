import { useEffect, useState } from "react"

export const TablaDatos = ({ data }) => {
    const [actual,setActual]=useState()
    useEffect(()=>{
        setActual(data[data.length-1])
    },[data])
    
    return (

        <div >
            <h1 className="text-center">Tabla de datos actuales</h1>
            <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>ID</th>
              <th style={{ textAlign: "center" }}>Temperatura del aire</th>
              <th style={{ textAlign: "center" }}>Humedad del aire</th>
              <th style={{ textAlign: "center" }}>Humedad de suelo</th>
              <th style={{ textAlign: "center" }}>Fecha</th>
              <th style={{ textAlign: "center" }}>Estatus de la bomba</th>
            </tr>
          </thead>
          <tbody>
            {actual? (
                <tr >
                <th scope="row">{actual.id}</th>
                <td>{actual.air_tem}</td>
                <td>{actual.hum_air}</td>
                <td>{actual.hum_floor}</td>
                <td>{actual.date}</td>
                <td>{actual.status_bomb}</td>
                <td>
                </td>
              </tr>
            ): 'No hay datos'}
                
          </tbody>
        </table>
            <h1 className="text-center">Tabla de todos los datos registrados</h1>
            <table className="table table-dark table-striped">
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>ID</th>
                        <th style={{ textAlign: "center" }}>Temperatura del aire</th>
                        <th style={{ textAlign: "center" }}>Humedad del aire</th>
                        <th style={{ textAlign: "center" }}>Humedad de suelo</th>
                        <th style={{ textAlign: "center" }}>Fecha</th>
                        <th style={{ textAlign: "center" }}>Estatus de la bomba</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, server) => {
                        return (
                            <tr key={(item.id)}>
                                <th scope="row">{item.id}</th>
                                <td>{item.air_tem}</td>
                                <td>{item.hum_air}</td>
                                <td>{item.hum_floor}</td>
                                <td>{item.date}</td>
                                <td>{item.status_bomb}</td>
                                <td>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}