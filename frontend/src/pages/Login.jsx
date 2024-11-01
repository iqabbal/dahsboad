import React, { useState , useContext} from 'react'
import  Input  from '../components/common/Input'
import { RiLockPasswordLine } from "react-icons/ri";
import { CiUser } from "react-icons/ci";
import { IoLockClosedOutline } from "react-icons/io5";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/common/Alert';
import { userContext } from '../context/UserContext';

const URL = 'http://localhost:3001/auth/login'

const Login = () => {

  const [username , setUsername] = useState('');
  const [password , setPassword] = useState('');
  const [close    ,setClose] = useState(false);
  const [errorMessage , setErrorMessage] = useState('');
  const navigate = useNavigate();
  const {setUser , setLoged } = useContext(userContext);
  const sendData = async () => {

        await axios.post(URL,{ username , password}).then((data)=>{
            if(data.status === 201){
                navigate("/");
                setLoged(true);
                setUser({role : data.data[0].RoleName});
                console.log("roleName is : " , data.data[0].RoleName);
                console.log(data.data);
            }else{
                setClose(true);
                setErrorMessage("Invalid login or password");
                
            }
        }).catch((error)=>{
            console.log(error);
        })
        
        // if(password === '12345678'){
        //   setUser({username , role : "student" , permissions : "create "});
        //   setLoged(true);
        //   navigate("/");
        // }else{
        //   setClose(true);
        //   setErrorMessage("Invalid login or password.");
        // }
  }


  const HandleSubmit = (e) => {
    e.preventDefault();
    
    console.log("username : " , username);
    console.log("password : " , password );
    if( !username|| !password){
      setClose(true);
      setErrorMessage("Please fill in all required fields.")
    }
    else if(password.length < 8){
      setClose(true);
      setErrorMessage("Password must be more than 8 characters.");
    }else{
      sendData();
    }
  }

  return (
    <div className=' flex justify-center items-center w-full h-full flex-col   bg-[#f3f4f7] md:flex-row shadow-3xl shadow-sm'>
      {close && <Alert message={errorMessage} setClose={setClose}/> }
      <form className='rounded-l-lg w-full sm:w-3/4 md:w-1/3 2xl:w-1/4 h-[360px] border-y-2 border-l-2 flex justify-center  items-center flex-col gap-4 bg-white '  onSubmit={HandleSubmit} >
        <span className='w-[80%] text-4xl font-medium '>login</span>
        <h1 className='w-[80%] text-[#7d7f89] '> Sign in to your account </h1>
        <div className='flex w-[80%] h-[40px] '>
          <span className='flex justify-center border-1 rounded-l-md items-center w-[40px] h-full bg-[#f3f4f7]'><CiUser/></span>
          <input placeholder="Username" type="text"  value={username} onChange={(e)=>{setUsername(e.target.value)}} className='h-[40px] focus:outline-none   focus:ring-2 focus:ring-[#5856d6] w-full border-1 border-[#D9D9D9] rounded-r-md placeholder:p-4  placeholder:text-[#737a85] text-lg '/>
        </div>
        <div className='flex w-[80%] h-[40px] '>
          <span className='flex justify-center border-1 rounded-l-md items-center w-[40px] h-full bg-[#f3f4f7]'><IoLockClosedOutline/></span>
          <input placeholder="Password" type="password"  value={password} onChange={(e)=>{setPassword(e.target.value)}} className='h-[40px] focus:outline-none   focus:ring-2 focus:ring-[#5856d6] w-full border-1 border-[#D9D9D9] rounded-r-md placeholder:p-4  placeholder:text-[#737a85] text-lg '/>
        </div>
        <div className='flex justify-around w-full'>
          <button className='px-4 py-2 bg-[#5856d6] text-white rounded-xl hover:bg-[#2825d3]' type='submit'>Login</button> 
          {/* <a className='text-[#5856d6] underline cursor-pointer hover:text-purple-700'>Forgot password</a> */}
        </div>
      </form>
      <div className='rounded-r-lg w-full sm:w-3/4  md:w-1/3  2xl:w-1/4 h-[360px]  border-1 p-4 bg-[#5856d6]'>
          <img src="../src/assets/logo1.svg" alt="logo"  className='h-full w-full'/>
        
      </div>
    </div>
    )
}

export default Login




























