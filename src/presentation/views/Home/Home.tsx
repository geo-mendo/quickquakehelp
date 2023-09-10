import { Button, Typography} from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../router/routes';
import moroccoFlag from '../../../assets/morocco-flag.png'

export const Home = () => {
    const navigate = useNavigate();
  return (
    <div className='flex flex-col h-screen justify-center items-center gap-16'>
        <Typography type='h1' as="h1" className='text-3xl font-bold ' ><span className='text-red-900' >Quick Quake</span> <span className='text-light-green-900' >Help</span></Typography>
        <img src={moroccoFlag} alt='morocco flag' width={250}/>
        <div className='flex justify-center items-center gap-8'>
            <Button color='teal' onClick={() => navigate(ROUTES.NEED_LIST)} >Voir les besoins d'aide !</Button>
            <Button color='orange' onClick={() => navigate(ROUTES.ADD_NEED)} >Nous avons besoin d'aide !</Button>
        </div>
    </div>
  )
}
 