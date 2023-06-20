import React,{useEffect} from 'react'

function Profile() {

        const auth = localStorage.getItem("user");
        const auth2=JSON.parse(auth)
    
  return (
    <div>
        <h1>Profile Page</h1>
        {/* <b>Name:</b><textarea name="name" className="profile-t" cols="30" rows="1">{JSON.parse(auth).name}</textarea>
        <br />
        <b>Email:</b><textarea name="email" className="profile-t" cols="30" rows="1">{JSON.parse(auth).email}</textarea>
        <br /> */}
    
    {/* <ul>
            <b>Name: </b>{auth2.name}
            <br />
            <b>Email: </b>{auth2.email}

    </ul> */}
    <div>
            <div className='outer'><b>Name: </b></div><div className='inner'>{JSON.parse(auth).name}</div>
    </div>
       
    <div>
        <div className='outer'><b>Email: </b> </div><div className='inner'>{JSON.parse(auth).email}</div>
        
    </div>  

    <div>
        <div className='outer'><b>userId: </b> </div><div className='inner'>{JSON.parse(auth)._id}</div>
        
    </div>  
 
    

    </div>
  )
}

export default Profile