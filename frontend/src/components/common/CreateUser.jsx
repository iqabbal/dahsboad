import {useContext, useEffect, useState } from 'react'
import { userContext } from '../../context/UserContext'
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { IoLockClosedOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import axios from 'axios'
import Select from 'react-select';

// const options = [];
  
const URL = 'http://localhost:3001/users/'

//:username for delete

  
const CreateUser = ({setOpenUserForm , action}) => {

    //Alert
    const [close,setClose] = useState(false);
    const [errorMessage , setErrorMessage] = useState('');

    const [options,setOptions] = useState([]);
    const [showPassword ,setShowPassword] = useState(false)
    const {
        users ,setUsers,
        firstName,setFirstName,
        lastName,setLastName,
        username,setUsrname , 
        email,setEmail , 
        password,setPassword , 
        confirmPassword , setConfirmPassword , 
        roles, setRoles , 
        initUserStates
    } = useContext(userContext);
        
    useEffect(() => {
            if (roles && roles.length > 0) {
                const newOptions = roles.map((role) => ({
                    value: role.roleName.toLowerCase(), 
                    label: role.roleName.charAt(0).toUpperCase() + role.roleName.slice(1)
                }));
                setOptions(newOptions);
            }
    }, []);

    const handleChange = (selected) => {
            console.log("Error Here");
            // setRoles(selected);
    };


    const CreateUser =async  ()=>{
        await axios.post(URL, {firstName ,lastName , username , email , roleName : "Admin"}).then((res)=>{
                if(res.status === 201){
                    console.log("user data" , res.data);
                }
        })
    }
        
    const handleSubmit = (e) => {
        
        e.preventDefault();
        if(!firstName || !lastName || !username || !email || !password  ){
            console.log("Hello World");
            setErrorMessage("please fill all required fill");
            setClose(true);
            // return;
        }
        else{
            console.log("set users");
            CreateUser();
            setUsers((prevUsers) => [...prevUsers, {  firstName ,lastName , username , email , roleName : "Admin" }]);
            initUserStates();
            setConfirmPassword('');
            setOpenUserForm(false);
        }
        // }else if(password.length < 8){
        //     setErrorMessage("passowrd is too short");
        
        // }else if (password !== confirmPassword ) {
        //     setErrorMessage("passwords are not mathes");
        // }else{
        //     setClose(false);
        //     setUsers((prevUsers) => [...prevUsers, { firstName , lastName , username , email , password }]);
        // }
        
              
    }

  return (
    <div>
             {close && <Alert message={errorMessage} setClose={setClose}/> }
            <form onSubmit={handleSubmit} className=' absolute  left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] flex flex-col  justify-center sm:justify-start p-5  rounded-md  gap-8 border-2    bg-white h-[840px] sm:w-3/4 md:w-2/4  lg:w-2/4   sm:max-w-[500px] min-w-[300px]'>
                <div className='w-full bg-red-300 relative'><IoIosCloseCircleOutline className='text-black text-xl absolute right-0 cursor-pointer' onClick={()=>{setOpenUserForm(false)}}/></div>
                <h1 className='font-bold text-4xl'>Register</h1>
                <p>create an account</p>
                <div className='flex h-[40px]'>
                    <span className='flex justify-center border-1 rounded-l-md items-center w-[40px] h-full bg-[#f3f4f7]'><CiUser/></span>
                    <input value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} placeholder="First Name" type="text"   className='h-[40px] w-full focus:outline-none   focus:ring-2 focus:ring-[#5856d6] border-1 border-[#D9D9D9] rounded-r-md placeholder:p-4  placeholder:text-[#737a85] text-lg '/>
                </div>
                <div className='flex h-[40px] '>
                    <span className='flex justify-center border-1 rounded-l-md items-center w-[40px] h-full bg-[#f3f4f7]'><CiUser/></span>
                    <input value={lastName} onChange={(e)=>{setLastName(e.target.value)}} placeholder="Last Name" type="text"   className='h-[40px] w-full focus:outline-none   focus:ring-2 focus:ring-[#5856d6] border-1 border-[#D9D9D9] rounded-r-md placeholder:p-4  placeholder:text-[#737a85] text-lg '/>
                </div>
                <div className='flex h-[40px]'>
                    <span className='flex justify-center border-1 rounded-l-md items-center w-[40px] h-full bg-[#f3f4f7]'><FaRegUserCircle/></span>
                    <input value={username} onChange={(e)=>{setUsrname(e.target.value)}} placeholder="Usesrname" type="text"   className='h-[40px] w-full focus:outline-none   focus:ring-2 focus:ring-[#5856d6] border-1 border-[#D9D9D9] rounded-r-md placeholder:p-4  placeholder:text-[#737a85] text-lg '/>
                </div>
                <div className='flex h-[40px]'>
                    <span className='flex justify-center border-1 rounded-l-md items-center w-[40px] h-full bg-[#f3f4f7]'><MdOutlineEmail/></span>
                    <input value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" type="Email"   className='h-[40px] w-full focus:outline-none   focus:ring-2 focus:ring-[#5856d6] border-1 border-[#D9D9D9] rounded-r-md placeholder:p-4  placeholder:text-[#737a85] text-lg '/>
                </div>
                <div className='flex h-[40px]'>
                    <span className={`flex justify-center border-1 rounded-l-md items-center w-[40px] h-full bg-[#f3f4f7]`}><IoLockClosedOutline/></span>
                    <input value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" type={showPassword ? 'text' : 'password'}   className='h-[40px] w-full focus:outline-none   focus:ring-2 focus:ring-[#5856d6] border-1 border-[#D9D9D9] rounded-r-md placeholder:p-4  placeholder:text-[#737a85] text-lg '/>
                </div>
                <div className='flex h-[40px]'>
                    <span className={`flex justify-center border-1 rounded-l-md items-center w-[40px] h-full bg-[#f3f4f7]`}><IoLockClosedOutline/></span>
                    <input value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} placeholder="Confirm Password" type={showPassword ? 'text' : 'password'}   className='h-[40px] w-full focus:outline-none   focus:ring-2 focus:ring-[#5856d6] border-1 border-[#D9D9D9]  placeholder:p-4  placeholder:text-[#737a85] text-lg '/>
                </div>
                <div className='flex h-[40px]'>
                    <input type='checkbox' className='w-[40px] h-full' checked={showPassword} onChange={()=>{setShowPassword(!showPassword)}}/>
                    <span className='flex justify-center  rounded-l-md items-center max-w-[200px] ml-4 h-full '>Show password</span>
                </div>

                <div className="h-[40px] rounded-lg  placeholder:text-[#737a85] text-lg" >
                    <Select
                        value={roles}
                        onChange={handleChange}
                        options={options}
                        placeholder="Select user Role"
                    />  
                </div>
                <button className='bg-green-700 px-4 py-2 rounded-md font-medium max-w-[200px] text-white  ' type='submit'>{action === "create" ? "Create Account" : "Update Info"}</button>    

            </form>
    </div>
  )
}

export default CreateUser