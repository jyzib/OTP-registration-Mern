import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Registration from './Registration'
import Otp from './Otp'

import Home from './Home'
function App() {
const [useremail,setuseremail] = useState({})

  return (
    <BrowserRouter>
    <div className="boxx">
    <div className="">
    <Routes>
      <Route path='/' element={<Registration useremail={setuseremail} />} />
      <Route path='/otp/:id' element={<Otp userdata={useremail}/>} />
      <Route  path='/home' element={<Home useremail={useremail} />} />
    </Routes>
    </div>
    <img src="https://venuo.co.uk/static/log-in-girl.svg" alt="" />
    </div>
    </BrowserRouter>
   
  )
}

export default App
