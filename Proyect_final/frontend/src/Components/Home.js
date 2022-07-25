import { Link } from 'react-router-dom'
import './assetss/css/Login.css'
import Nav from './Nav'

export default function Home() {
     return (
          <div>
               <Nav />
               <div>

                    <div className="position-relative overflow-hidden p-3 p-md-5 m-md-5 text-center bg-light">
                         <div className="col-md-5 p-lg-5 mx-auto my-5">
                              <h1 className="display-4 fw-normal">NeoSoft</h1>
                              <p className="lead fw-normal">Proyecto Integrador</p>
                              <Link className="btn btn-outline-secondary" to='/regis_all'>Registros</Link>
                              <br /><br />
                              <Link className="btn btn-outline-secondary" to="/Calculos">Datos estadisticos</Link>
                              <br /><br />

                         </div>
                         <div className="product-device shadow-sm d-none d-md-block"></div>
                         <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
                    </div>
               </div>
          </div>
     )
}