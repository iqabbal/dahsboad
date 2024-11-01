import { useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { userContext } from '../context/UserContext';

const ImportCsv = () => {

  const navigate = useNavigate();
  const {loged} = useContext(userContext); 

  // useEffect(()=>{
  //     if(!loged){
  //       navigate('/login');
  //     }
  // },[])

  return (
    <div>ImportCsv</div>
  )
}

export default ImportCsv