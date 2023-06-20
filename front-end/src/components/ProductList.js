import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';


function ProductList() {
    const [products,setProducts]=useState([]);

    useEffect(()=>{
        getProduct();
    },[])

    const getProduct=async ()=>{
        let result=await fetch('http://localhost:5000/products',{
            headers:{
             Authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result=await result.json()
        setProducts(result);
    }

    const deleteProduct=async (id)=>{
        let result=await fetch(`http://localhost:5000/product/${id}`,
        {
          method:'delete',
          headers:{
            Authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
           }
        });
        result=await result.json()
        console.warn(result);
        if(result)
        {
            getProduct();
        }
    }
    const searchHandle=async (event)=>{
        
        let key=event.target.value;
        if(key)
        {
        let result=await fetch(`http://localhost:5000/search/${key}`,{
        headers:{
            Authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
         } });
        result=await result.json()
        if(result){
            setProducts(result);
        }
    }
    else{
        getProduct();
    }
        
    }
  

  return (
    <>
    <div className='product-list'>
        <h1>Product List</h1>
        <input type="text" placeholder='Search Product' className='search-product-box' onChange={searchHandle}/>
        <ul>
            <li><h4>Sl.No</h4></li>
            <li><h4>Name</h4></li>
            <li><h4>Price</h4></li>
            <li><h4>Category</h4></li>
            <li><h4>Company</h4></li>
            <li><h4>Operation</h4></li>
        </ul>
    {
       products.length >0 ? products.map((item,index)=>
        <ul key={item._id}>
            <li >{index+1}</li>
            <li >{item.name}</li>
            <li >{item.price} /-Rs</li>
            <li >{item.category}</li>
            <li >{item.company}</li>
            <li><button className="operation" onClick={()=>deleteProduct(item._id)}>Delete</button>
           <button  className="operation"><Link to={"/update/"+item._id} className="updatelink"  >Update</Link></button> </li>
        </ul>

        )
        :
        <h1>No Result Found</h1>
    }
    </div>
    </>
  )
}

export default ProductList;