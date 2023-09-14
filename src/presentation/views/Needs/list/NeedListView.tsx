import { useAtomValue } from 'jotai';
import { langAtom, needsAtom } from '../../../../states/atoms';
import { NeedCard } from './components/NeedCard';
import { AppNavBar } from '../../../AppNavBar';
import { MultipleMarkerMapView } from '../detail/components/MultipleMarkerMapView';
import {
  Button,
  Select,
  Spinner,
  Typography,
  Option,
} from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../router/routes';
import { useState } from 'react';
// import { moroccoRegionDistrict } from '../../../../services/cities/enum';
import { NeedDto } from '../../../../data/dtos/NeedDto';

interface IFilterFields {
  value: string;
  field: string;
}

export const NeedListView = () => {
  const needs = useAtomValue(needsAtom);

  const initialFilter: IFilterFields = {
    value: '',
    field: '',
  };
  const [filter, setFilter] = useState<IFilterFields>(initialFilter);

  const lang = useAtomValue(langAtom);
  const navigate = useNavigate();

  const filteredNeeds = () =>
    needs.filter(
      (need) => need[filter.field as keyof NeedDto] === filter.value,
    );

  const getNeeds = () => {
    return filter.value !== '' && filter.field ? filteredNeeds() : needs;
  };

  return (
    <div className="bg-gray-200">
      <AppNavBar />
      <div className="px-5 pb-8 ">
        {needs.length > 0 && <MultipleMarkerMapView needs={needs} />}
        <div className="items-center my-4">
          <Typography variant="h2">Filtre</Typography>
          <div className="flex gap-1 items-center my-4">
            <div className="w-72">
              <Select
                label="Status"
                onChange={(value) =>
                  setFilter({ field: 'status', value: value as string })
                }
              >
                <Option value="validated">
                  {lang === 'fr' ? 'Terminé' : 'انتهى '}
                </Option>
                <Option value="pending">
                  {lang === 'fr' ? 'En cours' : 'الجاري '}
                </Option>
                <Option value="waiting">
                  {lang === 'fr' ? 'En attente' : 'في الانتظار '}
                </Option>
              </Select>
            </div>

            <div className="w-72">
              {/* <Select
                label="Région"
                onChange={(value) =>
                  setFilter({ field: 'area', value: value as string })
                }
              >
                {moroccoRegionDistrict.map((region) => (
                  <Option value={region.area}>{region.area}</Option>
                ))}
              </Select> */}
            </div>
          </div>
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
