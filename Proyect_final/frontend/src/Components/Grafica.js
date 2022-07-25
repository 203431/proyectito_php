import { Bar } from "react-chartjs-2";
import { Chart as ChartJS} from "chart.js/auto";
  export const Grafica=({datos,numD})=>{
    const label=[]
    for (let i = 0; i < numD; i++) {
       label.push('Clase: '+String.fromCharCode(97+i).toUpperCase())
      
    }
  const data = {
    labels:label, 
    datasets: [{
      label: 'Frecuencia de la clase',
      backgroundColor: 'rgba(0,0,0,1)',
      borderColor: 'black',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(0,255,0,0.2)',
      hoverBorderColor: "#FF0000",
      data: datos
    }]
  };
  const opciones = {
    maintainAspectRatio: false,
    responsive: true
  }
    return(
        <div >
          <div style={{"minHeight":"500px"}}>
        <Bar data={data} options={opciones}/>
        </div>
        </div>
    )
} 