import { useContext, useEffect, useState } from 'react';
import { userContext } from '../../context/UserContext';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdDriveFileRenameOutline } from "react-icons/md";
import Select from 'react-select';
import Alert from './Alert';

// Permissions options
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

const CreateRole = ({ setOpenRoleForm , action }) => {

    //Alert
    const [close,setClose] = useState(false);
    const [errorMessage , setErrorMessage] = useState('');


    const { setRoles, roles , newRole, setNewRole } = useContext(userContext);

    useEffect(()=>{
        console.log("The Role is  : ", newRole);
    },[]);
    const handleNameChange = (e) => {
        setNewRole(prevState => ({
            ...prevState,
            roleName: e.target.value
        }));
    };

    const handlePermissionsChange = (selected) => {
        setNewRole(prevState => ({
            ...prevState,
            permissions: selected.map(permission => permission.value)
        }));
    };

    const handleSubmit = (e) => {

        e.preventDefault();
        if(newRole.permissions.length < 1 || !newRole.roleName){
            console.log("test is work ");
            // alert("hello");
            setClose(true);
            setErrorMessage("please fill all fields");
            console.log("close : " + close +" error Message : "+ errorMessage)
            return;
        }
        setRoles(prev => {
            const existingRoleIndex = prev.findIndex(role => role.roleName === newRole.roleName);
            if (existingRoleIndex !== -1) {
                const updatedRoles = [...prev];
                updatedRoles[existingRoleIndex] = newRole;
                return updatedRoles;
            }
            return [...prev, newRole];
        });

        setNewRole({ roleName: '', permissions: [] });
        setOpenRoleForm(false);
    };

    return (
        <div>
           {close && <Alert message={errorMessage} setClose={setClose}/> }
            <form onSubmit={handleSubmit} className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] flex flex-col justify-center sm:justify-start p-5 rounded-md gap-4 border-2 bg-white  sm:w-3/4 md:w-2/4 lg:w-2/4 sm:max-w-[500px] min-w-[300px]'>
                <div className='w-full bg-red-300 relative'>
                    <IoIosCloseCircleOutline className='text-black text-xl absolute right-0 cursor-pointer' onClick={() => { setOpenRoleForm(false) }} />
                </div>
                <h1 className='font-bold text-4xl'>Role</h1>
                <p>Create a role</p>
                <div className='flex h-[40px]'>
                    <span className='flex justify-center border-1 rounded-l-md items-center w-[40px] h-full bg-[#f3f4f7]'><MdDriveFileRenameOutline /></span>
                    <input
                        value={newRole.roleName}
                        onChange={handleNameChange}
                        placeholder="Role Name"
                        type="text"
                        className='h-[40px] w-full focus:outline-none focus:ring-2 focus:ring-[#5856d6] border-1 border-[#D9D9D9] rounded-r-md placeholder:p-4 placeholder:text-[#737a85] text-lg'
                    />
                </div>
                <div className="rounded-lg placeholder:text-[#737a85] text-lg ">
                    <Select
                        isMulti
                        value={options.filter(option => newRole?.permissions?.includes(option.value))}
                        onChange={handlePermissionsChange}
                        options={options}
                        placeholder="Select Role Permissions"
                    />
                <button className='bg-blue-700 px-4 py-2 rounded-md font-medium max-w-[200px] text-white mt-4' type='submit'>
                    {action === "create" ? "Create Role" : "Update Role"}
                </button>
                </div>
            </form>
            
        </div>
    );
}

export default CreateRole;
