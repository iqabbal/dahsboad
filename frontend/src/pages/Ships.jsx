import { useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { userContext } from '../context/UserContext';

const Ships = () => {

  const navigate = useNavigate();
  const {loged} = useContext(userContext); 

  // useEffect(()=>{
  //     if(!loged){
  //       navigate('/login');
  //     }
  // },[])

  return (
    <div>Ships</div>
  )
}

export default Ships