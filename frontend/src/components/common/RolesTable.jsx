import React from 'react'

const RolesTable = () => {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
    <thead>
        <tr>
            <th className="border border-gray-300 bg-[#f2f2f2] p-2 w-1/4">No</th>
            <th className="border border-gray-300 bg-[#f2f2f2] p-2 w-1/2">name</th>
            <th className="border border-gray-300 bg-[#f2f2f2] p-2 w-1/4">Actions</th>
        </tr>
    </thead>
    <tbody>
    {roles.map((role, index) => (
          <tr key={index}>
              <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{index + 1}</td>
              <td style={{ border: '1px solid #dddddd', padding: '8px' }}>{role.roleName}</td>
              <td style={{ border: '1px solid #dddddd', padding: '8px' }} className='flex gap-6 justify-around items-center'>
                <div onClick={()=>{setView(true) , setSelectedRole(role)}} className='cursor-pointer flex gap-2 rounded-xl bg-green-700 p-2 text-white'>
                  <span>view</span>
                  <FaRegEye className='text-xl'/>

                </div>
                <div onClick={()=>{setSelectedRole(role); setNewRole(selectedRole); setOpenRoleForm(true)}} className='cursor-pointer flex gap-2 rounded-xl bg-blue-700 p-2 text-white'>
                  <span>Edit</span>
                  <FaEdit className='text-xl'/>
                  
                </div>
                <div onClick={()=>{setRemove(true); setSelectedRole(role)}  } className='cursor-pointer flex gap-2 rounded-xl bg-red-700 p-2 text-white'>
                  <span >Delete</span>
                  <MdDeleteOutline className='text-xl'/>
                </div>
              </td>
    
          </tr>
      ))}
    </tbody>
  </table>
  )
}

export default RolesTable