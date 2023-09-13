import { Link } from 'react-router-dom';
import { ROUTES } from '../router/routes';
import { useAtom, useAtomValue } from 'jotai';
import { langAtom } from '../states/atoms';
import { Button } from '@material-tailwind/react';
import frFlag from '../assets/icons8-la-france-96.png';
import arFlag from '../assets/icons8-maroc-96.png';
import React from 'react';
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from '@material-tailwind/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
export const AppNavBar = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const [lang, setLang] = useAtom(langAtom);
  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const changeLang = () => {
    if (lang === 'fr') {
      setLang('ar');
    } else {
      setLang('fr');
    }
  };

  return (
    <div className=" flex items-center justify-between w-full mx-0 p-4 mb-4 ">
      <Navbar className="mx-auto max-w-screen-xl px-6 py-4">
        <div
          className={`flex ${
            lang === 'ar' && 'flex-row-reverse'
          } items-center justify-between text-blue-gray-900`}
        >
          <div className="hidden lg:block">
            <NavList />
          </div>
          <IconButton
            variant="text"
            className=" h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
          <Button
            className="cursor-pointer flex gap-2 p-0 items-center"
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
        <Collapse open={openNav}>
          <NavList />
        </Collapse>
      </Navbar>
    </div>
  );
};

function NavList() {
  const lang = useAtomValue(langAtom);

  return (
    <ul
      className={`${
        lang === 'ar' && 'items-end'
      } my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center w-full lg:gap-6`}
    >
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link
          to={ROUTES.NEED_LIST}
          className="flex items-center text-xl hover:text-blue-500 transition-colors"
        >
          {lang === 'fr' ? 'Liste des besoins' : 'قائمة الاحتياجات'}
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link
          to={ROUTES.ADD_NEED}
          className="flex items-center text-xl hover:text-blue-500 transition-colors"
        >
          {lang === 'fr' ? "Demande d'aide" : 'طلب مساعدة'}
        </Link>
      </Typography>
    </ul>
  );
}
