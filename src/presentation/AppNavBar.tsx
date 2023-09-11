import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../router/routes';



export const AppNavBar = () => {
    const navigate = useNavigate();

    const goBack = () => {
        if(window.location.pathname.includes(ROUTES.NEED_DETAIL)) {
            navigate(ROUTES.NEED_LIST);
        } else {
            navigate(ROUTES.HOME);
        }
    }

  return (
    <div className='shadow flex items-center justify-start w-full mx-0 p-4 mb-4 bg-white'>
        <div onClick={goBack}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-return-left text-blue-500" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
            </svg>
        </div>
    </div>
  )
}
