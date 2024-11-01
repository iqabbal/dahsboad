import React, { useEffect, useState  , useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { userContext } from '../context/UserContext';

const Dashboard = () => {
  const {user , loged} = useContext(userContext); 
  const navigate = useNavigate();
  useEffect(()=>{
      if(!loged){
        navigate('/login');
      }
  },[])
  return (
    <div>
      <h1 className='font-bold text-3xl text-center'>Dashboard</h1>
      <div className='mt-8 border-2 border-dashed p-4 border-black'>
        {/* <h1>username : {user?.username}</h1> */}
        <h1>role : {user?.role}</h1>
        {/* <h1>permissions : {user?.permissions}</h1> */}
        
      </div>
    </div>
  )
}

export default Dashboard