import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Registration from './Registration'
import Otp from './Otp'
import Home from './Home'
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Registration/>} />
      <Route path='/otp/:id' element={<Otp/>} />
      <Route path='/home' element={<Home/>} />
    </Routes>
    </BrowserRouter>
   
  )
}

export default App
