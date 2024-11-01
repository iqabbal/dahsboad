import React , {useContext, useEffect, useState , } from 'react'
import Roles from '../components/common/Roles'
import ViewRole from '../components/common/ViewRole';

import { MdAdd } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

import CreateUser from '../components/common/CreateUser';
import CreateRole from '../components/common/CreateRole';
import { userContext } from '../context/UserContext';
import Confirm from '../components/common/Confirm';



const data = [{
  
}]
const Admin = () => {

  

  const [openUserForm , setOpenUserForm] = useState(false);
  const [openRoleForm , setOpenRoleForm] = useState(false);

  const [view, setView] = useState(false);
  const [remove, setRemove] = useState(false);

  const [selectedRole, setSelectedRole] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const {roles , setNewRole , users , editUser} = useContext(userContext);

  //navigate
  const [toUser ,setToUser] = useState(true);

  useEffect(()=>{

  },[roles, users])

  const handleEditUSer = (user)=>{
    console.log("Edit user function");
    setSelectedUser(user); 
    setNewRole(selectedRole); 
    setOpenUserForm(true);
  
  }
  return (
    <div className='w-screen h-[100vh]  p-4  '>
      {openUserForm  &&  <CreateUser setOpenUserForm={setOpenUserForm} action="create"/> }
      {openRoleForm  &&  <CreateRole setOpenRoleForm={setOpenRoleForm} action="create"/> }
        <a className={` p-2 ${ toUser ? 'font-bold border-b-2 border-black ' : ''} text-2xl`} onClick={()=>{setToUser(true); setOpenRoleForm(false)}}>User</a>
        <a className={` p-2 ${!toUser ? 'font-bold border-b-2 border-black' : ''} text-2xl` } onClick={()=>{setToUser(false); setOpenUserForm(false)}}>Role</a>
        <div className='flex  gap-4 flex-col mt-4'>
            {

              toUser && 
              <>
                  <h1 className='w-full  font-medium text-start text-2xl sm:text-4xl md:text-5xl'>User Management</h1>
                  <div className='flex flex gap-4 '>
                    <button className='px-4 py-2 bg-green-700 text-white rounded-lg flex gap-2 max-w-[200px]' onClick={()=>{setOpenUserForm(true)}}> <MdAdd className='font-bold text-2xl'/> Create New User</button>
                  </div>
                  <div className='overflow-x-auto'>
                    <table className="w-full border-collapse">
                      <thead>
                          <tr>
                              <th className='p-2 border-1 border-[#dddddd] bg-[#f2f2f2]'>No</th>
                              <th className='p-2 border-1 border-[#dddddd] bg-[#f2f2f2] w-1/5'>Username</th>
                              <th className='p-2 border-1 border-[#dddddd] bg-[#f2f2f2] w-1/5'>Fullname</th>
                              <th className='p-2 border-1 border-[#dddddd] bg-[#f2f2f2] w-1/5'>Email</th>
                              <th className='p-2 border-1 border-[#dddddd] bg-[#f2f2f2] w-1/5'>Role</th>
                              <th className='p-2 border-1 border-[#dddddd] bg-[#f2f2f2] w-1/5'>Actions</th>
                          </tr>
                      </thead>
                      <tbody>
                      {users.map((user, index) => (
                            <tr key={index} >
                                <td className='  border-1 border-[#dddddd] p-2'>{index + 1}</td>
                                <td className='border-1 border-[#dddddd] p-2'>{user.username}</td>
                                <td className='border-1 border-[#dddddd] p-2'>{user.firstName + " "}{user.lastName}</td>
                                <td className='border-1 border-[#dddddd] p-2'>{user.email}</td>
                                <td className='border-1 border-[#dddddd] p-2'>{user.roleName}</td>
                                <td className='flex gap-2 justify-around items-center border-1 border-[#dddddd] p-2'>
                                  <div onClick={()=>{setOpenUserForm(true) , editUser(user)}} className='cursor-pointer flex gap-2 rounded-xl bg-blue-700 p-2 text-white'>
                                    <span >Edit</span>
                                    <FaEdit className='text-xl'/>
                                    
                                  </div>
                                  <div onClick={()=>{setRemove(true); setSelectedRole(role)}  } className='cursor-pointer flex gap-2 rounded-xl bg-red-700 p-2 text-white'>
                                    <span  >Delete</span>
                                    <MdDeleteOutline className='text-xl'/>
                                  </div>
                                </td>
                      
                            </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
              </>
            }
            {
              !toUser && 
              <>
                  <h1 className='font-medium text-start text-2xl sm:text-4xl md:text-5xl'>Role Management</h1>
                  <button className='px-4 py-2 bg-blue-700 text-white rounded-lg flex gap-2 max-w-[200px]' onClick={()=>{setOpenRoleForm(true)}}> <MdAdd className='font-bold text-2xl'/> Create New Role</button>
                  <div className='overflow-x-auto'>
                    <table className="w-full border-collapse">
                      <thead>
                          <tr>
                              <th className="border border-gray-300 bg-[#f2f2f2] p-2 w-1/4">No</th>
                              <th className="border border-gray-300 bg-[#f2f2f2] p-2 w-1/2">name</th>
                              <th className="border border-gray-300 bg-[#f2f2f2] p-2 w-1/4">Actions</th>
                          </tr>
                      </thead>
                      <tbody>
                      {roles.map((role, index) => (
                            <tr key={index} >
                                <td className='  border-1 border-[#dddddd] p-2'>{index + 1}</td>
                                <td className='border-1 border-[#dddddd] p-2'>{role.roleName}</td>
                                <td className='flex gap-6 justify-around items-center border-1 border-[#dddddd] p-2'>
                                  <div onClick={()=>{setView(true) , setSelectedRole(role)}} className='cursor-pointer flex gap-2 rounded-xl bg-green-700 p-2 text-white'>
                                    <span >view</span>
                                    <FaRegEye className='text-xl'/>

                                  </div>
                                  <div onClick={()=>{setSelectedRole(role); setNewRole(selectedRole); setOpenRoleForm(true)}} className='cursor-pointer flex gap-2 rounded-xl bg-blue-700 p-2 text-white'>
                                    <span >Edit</span>
                                    <FaEdit className='text-xl'/>
                                    
                                  </div>
                                  <div onClick={()=>{setRemove(true); setSelectedRole(role)}  } className='cursor-pointer flex gap-2 rounded-xl bg-red-700 p-2 text-white'>
                                    <span  >Delete</span>
                                    <MdDeleteOutline className='text-xl'/>
                                  </div>
                                </td>
                      
                            </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
              </>
            }
              {view && <ViewRole setView={setView} role={selectedRole} />}
              {remove && <Confirm setRemove={setRemove} role={selectedRole} />}

        </div>
    </div>
  )
}

export default Admin


