import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../router/routes';
import { useAtom } from 'jotai';
import { langAtom } from '../states/atoms';
import { Button } from '@material-tailwind/react';
import frFlag from '../assets/icons8-la-france-96.png';
import arFlag from '../assets/icons8-maroc-96.png';
export const AppNavBar = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useAtom(langAtom);
  const goBack = () => {
    if (window.location.pathname.includes(ROUTES.NEED_DETAIL)) {
      navigate(ROUTES.NEED_LIST);
    } else {
      navigate(ROUTES.HOME);
    }
  };
  const changeLang = () => {
    if (lang === 'fr') {
      setLang('ar');
    } else {
      setLang('fr');
    }
  };

  return (
    <div className="shadow flex items-center justify-start w-full mx-0 p-4 mb-4 bg-white">
      {location.pathname !== ROUTES.HOME && (
        <div onClick={goBack}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-arrow-return-left text-blue-500"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"
            />
          </svg>
        </div>
      )}
      <Button
        className="cursor-pointer flex gap-2 items-center ml-auto"
        onClick={changeLang}
        variant="text"
      >
        {lang === 'fr' ? (
          <img className="w-8 h-8" src={arFlag} alt="ar" />
        ) : (
          <img className="w-8 h-8" src={frFlag} alt="fr" />
        )}
        {lang === 'ar' ? 'Français' : 'العربية'}
      </Button>
    </div>
  );
};
