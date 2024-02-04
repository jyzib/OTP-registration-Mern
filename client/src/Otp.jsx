import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useParams,useNavigate } from 'react-router-dom'
import { useRef } from 'react'

const Otp = ({userdata}) => {
    const refer = useRef([])
    const [input,setInpput] = useState(Array(4).fill(''))
    const {id} = useParams()
    console.log(userdata)
    const navigate = useNavigate()
    console.log(id)
const [otp,setotp] = useState([])
const handelotp =async ()=>{
    try {
        
        const postdata =  await axios.post('http://localhost:8000/otp',{_id:id,userotp:input.join('')})
        console.log(postdata)
        if(postdata.data.responce){
            navigate('/home')
        }
    } catch (error) {
        
        console.log(error)
    }
}


const handelclick = (e,i)=>{

    if(!isNaN(e.target.value)){
        const last = e.target.value.substring(e.target.value.length - 1)
        const g = [...input]
        g[i] = last
        setInpput(g)
        if(e.target.value&&  refer.current[i+1] && refer.current[i+1]){
            refer.current[i+1].focus()
        }
        console.log(g)
    }

}

useEffect(()=>{
    refer.current[0].focus()
console.log()
},[])
const handelkeyup = (e,i)=>{
    console.log(i)
    if(e.key == 'Backspace'){
        if(refer.current[i-1] && i >= 0){

            refer.current[i-1].focus()
        }
    }
}
  return (
    <div className="box">
    <div className='otp-box' >
        <h3>Enter otp sent to <br /> {userdata.email} </h3>
        <div className="">       {input.map((e,i)=>{
        return ( <input ref={(e)=>refer.current[i] = e} onChange={(e)=>handelclick(e,i)} className='otp' type="text" value={e} onKeyUp={(e)=>handelkeyup(e,i)} />)
       })}
       </div>

       <button onClick={handelotp} >Verify Otp</button>
     
    </div>
    </div>
  )
}

export default Otp
