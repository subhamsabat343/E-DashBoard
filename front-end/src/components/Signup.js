import React,{useState,useEffect } from 'react';
import { useNavigate} from 'react-router-dom';

function Signup() {
    const [name,setName]=useState();
    const [password,setPassword]=useState();
    const [email,setEmail]=useState();
    const navigate=useNavigate();

   
    useEffect(() => {
        const auth=localStorage.getItem('user');
        if(auth)
        {
                navigate('/');
        }
      
    },[]);

    const collectData=async ()=>{
        console.warn(name,email,password);
        let result=await fetch('http://localhost:5000/register',
        {
          method:'post',
          body:JSON.stringify({name,email,password}),
          headers:{
            'Content-Type':'application/json'
          }
        });
        result=await result.json()
        console.warn(result);
        localStorage.setItem("user",JSON.stringify(result.result));
        localStorage.setItem("token",JSON.stringify(result.auth));
        if(result)
        {
            navigate('/');
        }
    }
  return (
    <>
    <h1>Register</h1>
    <div className="register">
    
        <input className="inputBox" type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='ENTER NAME' />

        <input className="inputBox" type="email" 
        value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='ENTER EMAIL' />

        <input className="inputBox" type="password" 
        value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='ENTER PASSWORD' />
         
    </div>
    <button className='appbutton' onClick={collectData} type="button">Sign Up</button>
  
    </>
  )
}

export default Signup;

