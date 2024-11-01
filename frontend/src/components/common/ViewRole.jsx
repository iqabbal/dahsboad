import {useContext, useEffect, useState } from 'react'
import { userContext } from '../../context/UserContext'
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdOutlineDone } from "react-icons/md";
import { MdDoNotDisturb } from "react-icons/md";

import Select from 'react-select';

// const options = [];
  
const URL = 'http://localhost:3001/auth/signup'
  

const options = [
  { value: 'import_file', label: 'Import File' },
  { value: 'edit_ship_details', label: 'Edit Ship Details' },
  { value: 'display_ship_details', label: 'Display Ship Details' },
  { value: 'download_ship_list', label: 'Download Ship List' },
  { value: 'manage_waiting_causes', label: 'Manage Waiting Causes' },
  { value: 'display_ship_list', label: 'Display Ship List' },
  { value: 'display_dashboard', label: 'Display Dashboard' },
  { value: 'authenticate', label: 'Authenticate' },
  { value: 'manage_users', label: 'Manage Users' },
  { value: 'manage_role_permission', label: 'Manage Role Permission' }
];


const ViewRole = ({setView , role}) => {

  useEffect(()=>{

    console.log("role is : " , role);
  },[])

  
  return (
    <div className='absolute  left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] flex flex-col  justify-center sm:justify-start p-2  rounded-2xl  gap-8 border-2    bg-white h-[800px] sm:w-3/4 md:w-2/4  lg:w-2/4   sm:max-w-[500px] min-w-[300px]'>
          
                <div className='w-full bg-red-300 relative'><IoIosCloseCircleOutline className='text-black text-xl absolute right-0 cursor-pointer' onClick={()=>{setView(false)}}/></div>
                <div>
                    <h1 className='font-bold border-b-2 p-3 text-4xl '>{role.roleName}</h1>
                    <div className='flex flex-wrap justify-center items-center h-full'>
                        {
                            options.map((p)=>{
                              let done = false;
                              if(role.permissions.includes(p.value)){
                                done = true
                              }
                              return <div className=' w-[90%] p-2 font-bold border-2 rounded-md m-2  text-black flex flex-wrap justify-around'><span className='w-[70%] '>{p.label}</span> {done ? <MdOutlineDone className='text-green-700'/> : <MdDoNotDisturb className='text-red-700' />} </div>
                            })
                        }
                    </div>
                </div>
                
    </div>
  )
}

export default ViewRole