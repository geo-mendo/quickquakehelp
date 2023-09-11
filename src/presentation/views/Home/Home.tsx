import { Button, Typography} from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../router/routes';
import moroccoFlag from '../../../assets/morocco-flag.png'

export const Home = () => {
    const navigate = useNavigate();
  return (
    <div className='flex flex-col h-screen justify-center items-center gap-4'>
        <Typography type='h1' as="h1" className='text-3xl font-bold text-teal-500' >Aide mon <span className='text-red-900' >vi</span><span className='text-light-green-900' >lla</span><span className='text-red-900' >ge</span></Typography>
        <img src={moroccoFlag} alt='morocco flag' width={250}/>
        <div className='flex flex-col justify-center items-center gap-4'>
            <Button fullWidth color='teal' onClick={() => navigate(ROUTES.NEED_LIST)} >Voir les besoins d'aide !</Button>
            <Button fullWidth color='orange' onClick={() => navigate(ROUTES.ADD_NEED)} >Nous avons besoin d'aide !</Button>
        </div>
    </div>
  )
}
 