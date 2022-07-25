import { Link } from 'react-router-dom'

export default function Main() {
        return (
                <div className="position-relative overflow-hidden p-3 p-md-5 m-md-5 text-center bg-blue">
                        <div className="col-md-5 p-lg-5 mx-auto my-5">
                                <h1 className="display-4 fw-normal">NeoSoft</h1>
                                <p className="lead fw-normal">Proyecto Integrador</p>
                                <Link className="btn btn-outline-secondary" to='login'>Iniciar sesión</Link>
                                <br /><br />
                                <Link className="btn btn-outline-secondary col" to='Register'>Registrarse</Link>
                        </div>
                        <div className="product-device shadow-sm d-none d-md-block"></div>
                        <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
                </div>
        )
}