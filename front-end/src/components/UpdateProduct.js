import React, { useState,useEffect } from 'react';
import {useParams, useNavigate} from 'react-router-dom';


function UpdateProduct() {
  const [name,setName]=useState('');
  const [price,setPrice]=useState('');
  const [category,setCategory]=useState('');
  const [company,setCompany]=useState('');
  const params=useParams('');
  const navigate=useNavigate('');

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails=async()=>{
    //console.warn(params);
    let result=await fetch(`http://localhost:5000/product/${params.id}`,
    {
      headers:{
        Authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
       }
    });
  
        result=await result.json()
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company)
    

  }
  

  const updateProduct=async ()=>{
    let result=await fetch(`http://localhost:5000/product/${params.id}`,{
      method:'Put',
      body:JSON.stringify({name,price,category,company}),
      headers:{
        'Content-Type':"application/json",
        Authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
         
      }
    });
    result=await result.json();
    console.warn(result);
    navigate('/');
  console.warn(name,price,category,company);
  }

  return (
    <>
    <h1>Update Product</h1>
    <div className="product">
      
        <input  className='inputBox'
        type="text" placeholder='Enter  ProductName' 
        value={name} 
        onChange={(e)=>{setName(e.target.value)}}/>
     

        <input className='inputBox'
        type="number" placeholder='Enter Your Price' 
        value={price} 
        onChange={(e)=>{setPrice(e.target.value)}}/>
           

        <input className='inputBox'
        type="text" placeholder='Enter  Product category'   value={category} 
        onChange={(e)=>{setCategory(e.target.value)}}/>
            
      
        <input className='inputBox'
        type="text" placeholder='Enter  Product Company'   value={company} 
        onChange={(e)=>{setCompany(e.target.value)}}/>
        
       
    </div>
    <br />
    <button className='appbutton' onClick={updateProduct} >Update Product</button>
    </>
  )
}

export default UpdateProduct