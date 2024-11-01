import { useContext } from "react";
import { userContext } from "../../context/UserContext";


const Confirm = ({ setRemove , role }) => {
   
    const {roles , setRoles} = useContext(userContext);

    const handleDelete = () => {

        const updatedRoles = roles.filter(r => r.roleName !== role.roleName);
        setRoles(updatedRoles);
        setRemove(false);
        
    }

    return (
        <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] flex flex-col justify-center sm:justify-start p-2 rounded-md gap-4 border-2 bg-white h-[240px] sm:w-3/4 md:w-2/4 lg:w-2/4 sm:max-w-[500px] min-w-[300px]'>
           
           <h1 className='font-bold border-b-2 p-3 text-2xl'>Confirm Delete</h1>
           <p className='border-b-2 pb-4'>Are you sure want to delete <span className='font-bold'> {role.roleName} </span> role </p>
           <div className=' flex justify-end '>
                <button onClick={()=>{setRemove(false)}} className='rounded-md bg-gray-100 p-2 mr-4'>Cancel</button>
                <button className='text-white rounded-md bg-red-700 p-2 mr-4' onClick={handleDelete}>Delete</button>
           </div>
        </div>
    );
}

export default Confirm;
