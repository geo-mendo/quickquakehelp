import { useAtomValue } from 'jotai';
import {
  filtersLIsteViewAtom,
  langAtom,
  needsAtom,
} from '../../../../states/atoms';
import { NeedCard } from './components/NeedCard';
import { AppNavBar } from '../../../AppNavBar';
import { MultipleMarkerMapView } from '../detail/components/MultipleMarkerMapView';
import {
  IconButton,
  Button,
  Menu,
  MenuHandler,
  Spinner,
} from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../router/routes';
import { NeedListViewFilter } from './components/NeedListViewFilter';
import { NeedDto } from '../../../../data/dtos/NeedDto';
import { FunnelIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { needsServices } from '../../../../services/needs/needsServices';

export interface IFilterFields {
  status: string;
  district: string;
}

export const NeedListView = () => {
  const needs = useAtomValue(needsAtom);
  const filters = useAtomValue<IFilterFields>(filtersLIsteViewAtom);
  const lang = useAtomValue(langAtom);

  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const service = needsServices();

  useEffect(() => {
    service.reactualizeNeeds(needs);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const filteredNeeds = () => {
    console.log(filters);
    return needs.filter((need: NeedDto) => {
      if (filters.status !== '' && filters.district !== '') {
        return (
          need.status === filters.status && need.district === filters.district
        );
      }
      if (filters.status !== '') {
        return need.status === filters.status;
      }
      if (filters.district !== '') {
        return need.district === filters.district;
      }
      return true;
    });
  };

  const sortByCreatedDate = (a: NeedDto, b: NeedDto) => {
    return parseInt(b.createdDate) - parseInt(a.createdDate);
  };

  const getNeeds = () => {
    return filters.status !== '' || filters.district !== ''
      ? filteredNeeds().sort(sortByCreatedDate)
      : needs.sort(sortByCreatedDate);
  };

  return (
    <div className="bg-gray-200">
      <AppNavBar />
      <div className="px-5 pb-8 ">
        {needs.length > 0 && <MultipleMarkerMapView needs={needs} />}
        <div className="items-center mt-8 -mb-4">
          <Menu
            dismiss={{
              outsidePress: true,
              outsidePressEvent: 'click',
              ancestorScroll: true,
            }}
            handler={toggleMenu}
            placement="bottom-start"
            open={menuOpen}
          >
            <MenuHandler>
              <IconButton onClick={toggleMenu} color="teal" className="ml-4">
                <FunnelIcon className="h-8 w-8 " />
              </IconButton>
            </MenuHandler>
            <NeedListViewFilter closeMenu={toggleMenu} />
          </Menu>
        </div>
        {getNeeds().length > 0 ? (
          getNeeds().map((need) => (
            <NeedCard
              id={need.id}
              district={need.district}
              needPlace={need.needPlace}
              geolocation={need.geolocation}
              status={need.status}
              firstAidPresence={need.nbActualFirstAid}
              needsList={need.allNeeds}
              createdDate={need.createdDate}
            />
          ))
        ) : (
          <Spinner color="indigo" className="w-16 h-16" />
        )}
        <div className="fixed left-0 bottom-0">
          <Button
            className=" shadow-2xl rounded-none w-screen  text-md text-center py-4"
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
