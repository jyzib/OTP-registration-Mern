import React, { useState } from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"
const Registration = () => {
    const navigate = useNavigate()
    const [feild, setFeild] = useState({})
    const handelclick =async ()=>{
        try {
            
            const postData = await axios.post('http://localhost:8000/register',feild)
            console.log(postData)
            if(postData.data.responce){
                navigate(`/otp/${postData.data.id}`)
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
         <div className="box">
          <input type="text" onChange={(e)=>setFeild({...feild,name:e.target.value})}  placeholder='enter name' />
          <input type="email" onChange={(e)=>setFeild({...feild,email:e.target.value})} placeholder='enter email' />
          <input type="password" onChange={(e)=>setFeild({...feild,password:e.target.value})} placeholder='Enter password' />
          <button onClick={handelclick} >Submit</button>
         </div>
    </>
  )
}

export default Registration
