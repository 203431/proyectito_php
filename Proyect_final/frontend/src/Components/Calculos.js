import { useEffect, useState } from "react"
import Nav  from "./Nav";
import { Grafica } from "./Grafica";

export default function Estadistica() {
    const [datos, setDatos] = useState([]);
    const [Rango, setRango] = useState(0);
    const [Amplitud, setAmplitud] = useState(0);
    const [K, setK] = useState(0);
    const [Media, setMedia] = useState(0)
    const [Desviacion, setDesviacion] = useState(0)
    const [limSup, setLimSup] = useState([])
    const [limInf, setLimInf] = useState([])
    const [limInfEx, setLimInfEx] = useState([])
    const [limSupEx, setLimSupEx] = useState([])
    const [frecuencia, setFrecuencia] = useState([])
    const [frecuenciaAcum, setFrecuenciaAcum] = useState([])
    const [frecuenciaR, setFrecuenciaR] = useState([])
    const [marcaClase, setMarcaClase] = useState([])
    const [hipotesis, setHipotesis] = useState('')
    const [z, setZ] = useState()





    const acomodar = (arr) => {
        for (var i = 0; i < arr.length; i++) {

            // Last i elements are already in place 
            for (var j = 0; j < (arr.length - i - 1); j++) {

                // Checking if the item at present iteration
                // is greater than the next iteration
                if (arr[j] > arr[j + 1]) {

                    // If the condition is true then swap them
                    var temp = arr[j]
                    arr[j] = arr[j + 1]
                    arr[j + 1] = temp
                }
            }
        }
        // Print the sorted array
        return arr;

    }
    useEffect(() => {
        fetch('http://localhost:3001/registros')
      .then((r) => r.json())
      .then((res) => {
            console.log(res)
            const datosFiltrados = res.map((dato) => {

                return dato.hum_floor
            })
            console.log(datosFiltrados.length)
            const arrDatos = datosFiltrados.slice(datosFiltrados.length-150,datosFiltrados.length)
            console.log(arrDatos.length)
            const datosAcomodados = acomodar(arrDatos);
            // const datosAcomodados = acomodar(datosFiltrados);


            const UVariacion = 0.01;
            const rango = datosAcomodados[datosAcomodados.length - 1] - datosAcomodados[0];
            const k = Math.round(1 + (3.322 * Math.log10(datosAcomodados.length)))
            let amplitud = (rango / k) + UVariacion;
            amplitud *= 100;
            amplitud = parseInt(amplitud);
            amplitud /= 100;

            let aux = [datosAcomodados[0]];

            const arrLI = limites(aux, k, amplitud);


            aux = [(datosAcomodados[0] + amplitud) - UVariacion]
            const arrLS = limites(aux, k, amplitud);


            const arrLIE = []
            const arrLSE = []
            for (let i = 0; i < k; i++) {
                arrLIE.push(arrLI[i] - 0.005)
                arrLSE.push(arrLS[i] + 0.005)
            }





            const frec = []
            let cont = 0;

            for (let j = 0; j < k; j++) {

                for (let i = 0; i < datosAcomodados.length; i++) {
                    if (datosAcomodados[i] >= arrLI[j] && datosAcomodados[i] <= arrLS[j]) {
                        cont++;
                    }
                }
                frec.push(cont)
                cont = 0;
            }




            const arrFrecA = [frec[0]];
            for (let i = 1; i < k; i++) {
                arrFrecA.push(arrFrecA[i - 1] + frec[i])
            }


            const arrFrecR = []
            for (let i = 0; i < k; i++) {
                arrFrecR.push(frec[i] / datosAcomodados.length)
            }





            const MarcaC = []

            for (let i = 0; i < k; i++) {
                MarcaC.push((arrLI[i] + arrLS[i]) / 2)

            }





            let media = 0;

            for (let i = 0; i < datosAcomodados.length; i++) {
                media += datosAcomodados[i];
            }

            media /= datosAcomodados.length;

            let desviacionS = 0;
            for (let i = 0; i < datosAcomodados.length; i++) {
                desviacionS += Math.pow(Math.abs(datosAcomodados[i] - media), 2);
            }
            desviacionS /= datosAcomodados.length
            desviacionS = Math.sqrt(desviacionS);

            setAmplitud(amplitud)
            setK(k);
            setRango(rango)
            setMedia(media)
            setDesviacion(desviacionS)

            setFrecuencia(frec)
            setFrecuenciaAcum(arrFrecA)
            setFrecuenciaR(arrFrecR)
            setMarcaClase(MarcaC)
            setLimInf(arrLI)
            setLimSup(arrLS)
            setLimSupEx(arrLSE)
            setLimInfEx(arrLIE)


            let tamaño = (datosAcomodados.length * Math.pow(1.96, 2) * 0.5 * 0.5) / (Math.pow(0.05, 2) * (datosAcomodados.length - 1) + Math.pow(1.96, 2) * 0.5 * 0.5)
            tamaño = Math.ceil(tamaño)
            tamaño = parseInt(tamaño)

            let arrMuestra = []
            const auxNum = parseInt(datosAcomodados.length / tamaño);
            for (let i = auxNum - 1; i < tamaño; i += auxNum) {
                arrMuestra.push(datosAcomodados[i])

            }

            let mediaMuestra = 0;

            for (let i = 0; i < arrMuestra.length; i++) {
                mediaMuestra += arrMuestra[i];
            }
            mediaMuestra /= arrMuestra.length


            let z = (mediaMuestra - media) / (desviacionS / Math.sqrt(tamaño))
            console.log('media de la muestra',mediaMuestra)
            console.log('tamaño de la muestra',tamaño)
            // console.log('media muestra', mediaMuestra)
            // console.log('media', media);
            // console.log('tamaño', tamaño);
            // console.log('desviacion', desviacionS);
            // console.log(z);
            setZ(z)

            if (z < 1.96 && z > -1.96) {
                setHipotesis('La media de la población es correcta')
                
            } else {
                setHipotesis('La media calculada es diferente a la de la población');
            }



            setDatos(datosAcomodados);
        });



    }, []);




    const limites = (arr, k, amplitud) => {
        for (let i = 1; i < k; i++) {
            let aux = arr[i - 1] + amplitud
            aux *= 100;
            aux = parseInt(aux)
            aux /= 100;

            arr.push(aux)

        }

        return arr;
    }



    return (
        <div >
            <Nav />
            <br></br>
            <div className="container">
                <div className="table-responsive">


                    <table className="table table-striped">

                        <thead className='thead-dark'>
                            <tr className='table-dark'>
                                <th colSpan="9"><p className="text-center">Tabla de distribución de frecuencias</p></th>
                            </tr>
                            <tr className='table-dark text-center '>
                                <th>Clases</th>
                                <th>Lim inf</th>
                                <th>Lim sup</th>
                                <th>Lim inf exact</th>
                                <th>Lim sup exact</th>
                                <th>Frec Abs</th>
                                <th>Frec Acum</th>
                                <th>Frec Rela</th>
                                <th>Marca Clase</th>
                            </tr>
                        </thead>

                        <tbody>{limInf.map((data, i) => (
                                <tr key={i} >
                                    <th>{String.fromCharCode(97+i).toUpperCase()}</th>
                                    <td>{limInf[i]}</td>
                                    <td>{limSup[i]}</td>
                                    <td>{limInfEx.length>1? limInfEx[i].toFixed(2):'no hay datos '}</td>
                                    <td>{limSupEx.length>1? limSupEx[i].toFixed(2):'No hay datos'}</td>
                                    <td>{frecuencia[i]}</td>
                                    <td>{frecuenciaAcum[i]}</td>
                                    <td>{frecuenciaR.length>1? frecuenciaR[i].toFixed(3):'No datos'}</td>
                                    <td>{marcaClase.length>1? marcaClase[i].toFixed(2):'No datos '}</td>
                                </tr>
                            ))}


                        </tbody>
                    </table>
                </div>

                <div >
                    <h3>Datos totales: {datos.length} ---- Rango: {Rango} ----  Valor de amplitud:{Amplitud} ----  Valor de z: {z}</h3>
                    <h3>K:{K} ----  Media:{Media.toFixed(2)} ---- Desviacion:{Desviacion.toFixed(2)}  </h3>

                    <h1>
                        Comprobación de hipotesis:
                    </h1>

                    <h2 className={{color:"red"}}>{hipotesis}</h2>
                </div>

                    <div style={{"padding-bottom":"5%"}}>
                        <Grafica datos={frecuencia} numD={K}/>
                    </div>
            
            </div>




        </div>
    )

} 