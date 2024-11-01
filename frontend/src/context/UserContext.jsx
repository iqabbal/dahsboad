import { createContext, useEffect, useState } from "react";

const userContext = createContext();

const ContextProvider = ({ children }) => {
  
  const [users ,setUsers] = useState([]);
  const [user, setUser] = useState();
  const [loged, setLoged] = useState(false);
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName]  = useState('');
  const [username,setUsrname]   = useState('');
  const [email,setEmail]  = useState('');
  const [password,setPassword]  = useState('');
  const [confirmPassword,setConfirmPassword]  = useState('');
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState({ roleName: '', permissions: [] });

  const initUserStates = () => {
    setFirstName('');
    setLastName('');
    setUsrname('');
    setEmail('');
    setPassword('');
  }

  const editUser = (user) => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setUsrname(user.username);
    setEmail(user.email);
  }

  // useEffect(()=>{
  //     async function getUsers(){
  //         await axios.get("http://localhost:3001/users/").then((res)=>{
  //           if(res.status === 200){
  //               console.log("res " , res.data);
  //               setUsers(res.data);
  //           }
  //         })
  //     }
  //     getUsers();
  // })

  //firstName,setFirstName,lastName,setLastName,username,setUsrname , email,setEmail , password,setPassword , role, setRole
  const data = {editUser , initUserStates , users ,setUsers, newRole, setNewRole , user, setUser , loged, setLoged , firstName,setFirstName,lastName,setLastName,username,setUsrname , email,setEmail , password,setPassword , confirmPassword , setConfirmPassword ,roles, setRoles};
  return (
    <userContext.Provider value={data}>
      {children}
    </userContext.Provider>
  );
};

export { ContextProvider, userContext }; 
