import React, { useState } from 'react';

function AddProduct() {
  const [name,setName]=useState('');
  const [price,setPrice]=useState('');
  const [category,setCategory]=useState('');
  const [company,setCompany]=useState('');
  const [error,setError]=useState(false);

  const addProduct=async ()=>{

    if(!name || !price || !category || !company)
    {
      setError(true);
      return false;
    }

    console.log(name,price,category,company);
    const userId=JSON.parse(localStorage.getItem('user'))._id;
    console.log(userId);
    let result=await fetch('http://localhost:5000/add-product',
        {
          method:'post',
          body:JSON.stringify({name,price,category,company,userId}),
          headers:{
            'Content-Type':'application/json',
              Authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
             
          }
        });
        result=await result.json()
        console.warn(result);

    
  }

  return (
    <>
    <h1>Add Product</h1>
    <div className="product">
      
        <input  className='inputBox'
        type="text" placeholder='Enter  ProductName' 
        value={name} 
        onChange={(e)=>{setName(e.target.value)}}/>
      {error && !name && <span className='invalid-input'>Enter Valid name</span>}

        <input className='inputBox'
        type="number" placeholder='Enter Your Price' 
        value={price} 
        onChange={(e)=>{setPrice(e.target.value)}}/>
            {error && !price && <span className='invalid-input'>Enter Valid Price</span>}

        <input className='inputBox'
        type="text" placeholder='Enter  Product category'   value={category} 
        onChange={(e)=>{setCategory(e.target.value)}}/>
            {error && !category && <span className='invalid-input'>Enter Valid Category</span>}
      
        <input className='inputBox'
        type="text" placeholder='Enter  Product Company'   value={company} 
        onChange={(e)=>{setCompany(e.target.value)}}/>
            {error && !company && <span className='invalid-input'>Enter Valid Company</span>}

       
    </div>
    <br />
    <button className='appbutton' onClick={addProduct} >Add Product</button>
    </>
  )
}

export default AddProduct