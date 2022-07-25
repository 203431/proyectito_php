import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Main from './Main'
import Calculos from './Calculos'
import Regis_all from './Regis_All'

export default function Router() {
     return (
          <Routes>
               <Route path='/' element={<Main/>}></Route>
               <Route path='/home' element={<Home/>}></Route>
               <Route path='/login' element={<Login/>}></Route>
               <Route path='/Calculos' element={<Calculos/>}></Route>
               <Route path='/regis_all' element={<Regis_all/>}></Route>
          </Routes>
     )

}