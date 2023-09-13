import { useAtomValue } from 'jotai';
import { langAtom, needsAtom } from '../../../../states/atoms';
import { NeedCard } from './components/NeedCard';
import { AppNavBar } from '../../../AppNavBar';
import { MultipleMarkerMapView } from '../detail/components/MultipleMarkerMapView';
import { Button, Spinner } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../router/routes';

export const NeedListView = () => {
  const needs = useAtomValue(needsAtom);

  const lang = useAtomValue(langAtom);
  const navigate = useNavigate();

  return (
    <div className="bg-gray-200">
      <AppNavBar />
      <div className="px-5 pb-8 ">
        {needs.length > 0 && <MultipleMarkerMapView needs={needs} />}
        {needs.length > 0 ? (
          needs.map((need) => (
            <NeedCard
              id={need.id}
              district={need.district}
              needPlace={need.needPlace}
              geolocation={need.geolocation}
              status={need.status}
              firstAidPresence={need.nbActualFirstAid}
              needsList={need.allNeeds}
            />
          ))
        ) : (
          <Spinner color="indigo" className="w-16 h-16" />
        )}
        <div className="fixed left-0 bottom-0">
          <Button
            className=" shadow-2xl rounded-t-none w-screen  text-md text-center py-4"
            color="deep-purple"
            onClick={(e) => {
              e.preventDefault();
              navigate(ROUTES.ADD_NEED);
            }}
          >
            {lang === 'fr' ? "Demander de l'aide" : 'طلب مساعدة '}
          </Button>
        </div>
      </div>
    </div>
  );
};
