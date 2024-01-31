import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useParams,useNavigate } from 'react-router-dom'
const Otp = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    console.log(id)
const [otp,setotp] = useState([])
const handelotp =async ()=>{
    try {
        
        const postdata =  await axios.post('http://localhost:8000/otp',{_id:id,userotp:otp.join('')})
        console.log(postdata)
        if(postdata.data.responce){
            navigate('/home')
        }
    } catch (error) {
        
        console.log(error)
    }
}
  return (
    <div>
       {Array(4).fill(0).map(()=>{
        return ( <input onChange={(e)=>setotp([...otp,e.target.value])} className='otp' type="text" />)
       })}
       <button onClick={handelotp} >submit</button>
     
    </div>
  )
}

export default Otp
