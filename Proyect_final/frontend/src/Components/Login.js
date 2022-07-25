import React, { useEffect } from "react";
import axios from "axios";
import { useState } from 'react';
import './assetss/css/Login.css'

export default function Login() {
     useEffect(() => {
          document.title = 'Login'
     }, []);

     const [email, setEmail] = useState();
     const [pass, setPass] = useState();

     const login = () => {
          axios.post("http://localhost:3001/user", { 
               email: email,
               pass: pass,
          }).then((response) => {
               window.location = 'http://localhost:3000/Home'
          });
     };

     return (
          <div>
               
               <div className="sidenav">
                    <div className="login-main-text">
                         <h2>NeoSoft</h2>
                         <h2>Inciar sesión</h2>
                    </div>
               </div>
               <div className="main">
                    <div className="col-md-6 col-sm-12">
                         <div className="login-form">
                              <form>
                                   <div className="form-group">
                                        <label>Correo de usuario</label>
                                        <input type="text" id='email' className="form-control" placeholder="Nombre del usuario" onChange={e => setEmail(e.target.value)}/>
                                   </div>
                                   <div className="form-group">
                                        <label>Contraseña</label>
                                        <input type="password" id='pass' className="form-control input_pass" placeholder="Contraseña" onChange={e => setPass(e.target.value)} />
                                   </div>
                                   <br></br>
                                   <button onClick={login} type="submit" className="btn btn-black">Iniciar sesión</button>
                              </form>
                         </div>
                    </div>
               </div>
          </div >
     )
}