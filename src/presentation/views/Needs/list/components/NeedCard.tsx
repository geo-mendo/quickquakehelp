import {
  Card,
  CardBody,
  Typography,
  CardFooter,
  Button,
  Chip,
} from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../../router/routes';
import { openInMapApp } from '../../../../../services/mapService';
import { LatLngLiteral } from 'leaflet';
import {
  getStatusColor,
  getStatusText,
} from '../../../../../services/statusService';
import { useAtomValue } from 'jotai';
import { langAtom } from '../../../../../states/atoms';

interface NeedCardProps {
  district: string;
  needPlace: string;
  geolocation: LatLngLiteral;
  status: 'waiting' | 'pending' | 'validated';
  firstAidPresence: string;
  needsList: string[];
  createdDate: string;
  id: string;
}

export const NeedCard = (props: NeedCardProps) => {
  const navigate = useNavigate();
  const lang = useAtomValue(langAtom);
  const goToDetails = () => {
    navigate(`${ROUTES.NEED_DETAIL}/${props.id}`);
  };
  const convertDateInDays = (time: string) => {
    const now = Date.now();
    const diff = now - parseInt(time);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return lang === 'fr' ? 'Aujourd’hui' : 'اليوم';
    return lang === 'fr' ? `Il y a ${days} jours` : `أيام ${days} منذ `;
  };
  // const getAidStatusColor = () => {
  //   if (props.firstAidPresence === 'y') return 'green';
  //   if (props.firstAidPresence === 'n') return 'red';
  //   return 'gray';
  // };

  // const getAidStatusText = () => {
  //   if (props.firstAidPresence === 'y')
  //     return lang === 'fr' ? 'Secouriste sur place' : 'يوجد مسعف';
  //   if (props.firstAidPresence === 'n')
  //     return lang === 'fr' ? 'Pas de secouriste' : 'لا يوجد مسعف';
  //   return 'N/R';
  // };

  return (
    <Card key={props.id} className="mt-10 w-full">
      <CardBody>
        <Typography variant="h5" color="indigo" className="mb-2">
          <span>
            {lang === 'fr' && 'Province de '}
            {props.district}
            {lang === 'ar' && ' الإقليم'}
          </span>
        </Typography>
        <div
          className={`flex flex-col justify-between gap-2 px-2 mb-2 ${
            lang === 'fr' ? 'items-start' : 'items-end'
          }'}`}
        >
          <Chip
            className={`w-1/2 mb-2 ${
              lang === 'fr' ? 'self-start' : 'self-end'
            }`}
            color={getStatusColor(props.status)}
            value={getStatusText(props.status, lang)}
          />
          {/* <Chip
            className={`w-1/2 mb-2 ${
              lang === 'fr' ? 'self-start' : 'self-end'
            }`}
            color={getAidStatusColor()}
            value={getAidStatusText()}
          /> */}
        </div>
        <div
          className={`flex flex-col justify-between gap-2 px-2 mb-2 ${
            lang === 'fr' ? 'items-start' : 'items-end'
          }'}`}
        >
          <Typography>
            {lang === 'fr' && <span className="font-bold">Lieu: </span>}
            {props.needPlace}
            {lang === 'ar' && <span className="font-bold"> :مكان</span>}
          </Typography>
          <Typography>
            {lang === 'fr' && <span className="font-bold">Localisation: </span>}
            {props.geolocation.lat && props.geolocation.lng ? (
              <a
                onClick={() => openInMapApp(props.geolocation)}
                className=" cursor-pointer inline-block text-blue-500"
              >
                {' '}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-geo-alt"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>{' '}
              </a>
            ) : (
              'N/R'
            )}
            {lang === 'ar' && (
              <span className="font-bold"> : تحديد الموقع</span>
            )}
          </Typography>
        </div>
        <div className="px-2">
          <Typography className="font-bold">
            {lang === 'fr' ? 'Liste des besoins:' : ':قائمة الاحتياجات'}
          </Typography>
          <ul className="list-disc list-inside">
            {props.needsList.map((need, index) => (
              <li key={index}>{need}</li>
            ))}
          </ul>
        </div>
      </CardBody>
      <CardFooter className="pt-0 flex justify-between items-center">
        <Button
          size="sm"
          variant="text"
          color="blue"
          onClick={goToDetails}
          className="flex items-center gap-2"
        >
          {lang === 'fr' && (
            <span className="flex gap-2">
              Voir les détails{' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </span>
          )}
          {lang === 'ar' && (
            <span className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>{' '}
              رؤية التفاصيل
            </span>
          )}
        </Button>
        {lang === 'fr' && (
          <span className="self-">
            Publié: {convertDateInDays(props.createdDate)}
          </span>
        )}
        {lang === 'ar' && (
          <span> تم النشر: {convertDateInDays(props.createdDate)}</span>
        )}
      </CardFooter>
    </Card>
  );
};
