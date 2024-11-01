import { CAlert  } from '@coreui/react'
import { IoMdClose } from "react-icons/io";
import { motion} from 'framer-motion'
import { useEffect } from 'react';


const Alert = ({message , setClose}) => {
  useEffect(()=>{
      console.log("Alert is working fine");
  },[])
  return (
    <motion.div initial={{ opacity: 0 , x : 30}} animate={{ opacity: 1 , x : 0 }} className="absolute top-12 right-12 w-1/2 h-0">
        <CAlert color="danger" className="w-full flex justify-between ">
            <div>{message}</div>
            <IoMdClose onClick={()=>{setClose(false)}} className='cursor-pointer'/>
        </CAlert>
    </motion.div>
  )
}

export default Alert