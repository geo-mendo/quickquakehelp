import { useNavigate, useParams } from 'react-router-dom';
import { AppNavBar } from '../../../AppNavBar';
import { needsServices } from '../../../../services/needs/needsServices';
import { NeedDto } from '../../../../data/dtos/NeedDto';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Chip,
  Spinner,
  Typography,
} from '@material-tailwind/react';
import { useState, useEffect } from 'react';
import { AccordionIcon } from '../new/components/AddNewNeedForm';
import { MapView } from './components/MapView';
import { openInMapApp } from '../../../../services/mapService';
import { useAtom, useAtomValue } from 'jotai';
import { langAtom, needDetailsAtom } from '../../../../states/atoms';
import {
  getStatusColor,
  getStatusText,
} from '../../../../services/statusService';
import { colors } from '@material-tailwind/react/types/generic';
import { notifSercice } from '../../../../services/notifService';
import { ROUTES } from '../../../../router/routes';

export const NeedDetailView = () => {
  const lang = useAtomValue(langAtom);
  const navigate = useNavigate();
  const [open, setOpen] = useState(0);
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
  const { id } = useParams<{ id: string }>();
  const needService = needsServices();
  const [needDetails, setNeedDetails] = useAtom(needDetailsAtom);
  useEffect(() => {
    needService
      .getNeedDetails(id as string)
      .then((doc) => {
        setNeedDetails(doc.data() as NeedDto);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getPresenceText = (value: string) => {
    if (value === 'y') return lang === 'fr' ? 'Oui' : 'نعم';
    if (value === 'n') return lang === 'fr' ? 'Non' : 'لا';
    return 'N/R';
  };

  const getPresenceColor = (value: string) => {
    if (value === 'y') return 'green';
    if (value === 'n') return 'red';
    return 'gray';
  };

  const updateStatus = (status: 'validated' | 'pending' | 'waiting') => {
    needService
      .changeNeedStatus(id as string, status)
      .then(() => {
        notifSercice.success(
          lang === 'fr' ? 'Status changé' : 'تم تغيير الحالة',
        );
        navigate(ROUTES.NEED_LIST);
      })
      .catch(() => {
        notifSercice.error(
          lang === 'fr'
            ? 'Erreur lors du changement de status'
            : 'حدث خطأ أثناء تغيير الحالة',
        );
      });
  };

  return (
    <div>
      <AppNavBar />
      {!needDetails ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner color="teal" className="w-16 h-16" />
        </div>
      ) : (
        <section>
          <Typography variant="h4" color="indigo" className="mb-8 text-center">
            {lang === 'fr' && 'Province de '}
            {needDetails.district}
            {lang === 'ar' && ' الإقليم'}
          </Typography>
          <div className="px-4">
            <Typography color="indigo" className="mb-2">
              {lang === 'fr' && <span>Demande crée le: </span>}
              {needDetails.createdDate}
              {lang === 'ar' && <span> :الطلب تم إنشاؤه في</span>}
            </Typography>
            <Typography color="indigo" className="mb-2">
              {lang === 'fr' && <span>Traitement de la demande: </span>}
              <Chip
                className="inline-block"
                color={getStatusColor(needDetails.status)}
                value={getStatusText(needDetails.status, lang)}
              />
              {lang === 'ar' && <span> :معالجة الطلب </span>}
            </Typography>

            <Typography color="indigo" className="mb-2">
              <span>
                {' '}
                {lang === 'fr' ? 'Changer le status:' : ':تغيير الحالة'}{' '}
              </span>
            </Typography>

            <div
              className={`flex gap-4 text-xs ${
                lang === 'fr' ? 'justify-start' : 'justify-end'
              }`}
            >
              {needDetails.status !== 'validated' && (
                <button
                  onClick={() => updateStatus('validated')}
                  type="button"
                  className="inline-block p-1 border-2 border-green-500 rounded text-green-500"
                >
                  {lang === 'fr' ? 'Traitée' : 'معالجة'}
                </button>
              )}
              {needDetails.status !== 'pending' && (
                <button
                  onClick={() => updateStatus('pending')}
                  type="button"
                  className="rounded p-1 border-2 text-orange-500 border-orange-500"
                >
                  {lang === 'fr' ? 'En cours' : 'قيد الانجاز'}
                </button>
              )}
              {needDetails.status !== 'waiting' && (
                <button
                  onClick={() => updateStatus('waiting')}
                  type="button"
                  className="rounded p-1 border-2 text-gray-500 border-gray-500"
                >
                  {lang === 'fr' ? 'En attente' : 'في انتظار'}
                </button>
              )}
            </div>
          </div>
          <div className="px-4">
            <Accordion open={open === 0}>
              <AccordionHeader
                className={`${lang === 'ar' && 'justify-end'}`}
                onClick={() => handleOpen(0)}
              >
                {lang === 'ar' && (
                  <AccordionIcon id={0} open={open} marginClass="mr-auto" />
                )}
                <Typography variant="h5" color="indigo">
                  {lang === 'fr'
                    ? 'Informations de localisation:'
                    : 'معلومات الموقع'}
                </Typography>
                {lang === 'fr' && (
                  <AccordionIcon id={0} open={open} marginClass="ml-auto" />
                )}
              </AccordionHeader>
              <AccordionBody>
                <div className="pl-2">
                  {needDetails.geolocation.lat !== 0 &&
                    needDetails.geolocation.lng !== 0 && (
                      <MapView
                        type="static"
                        position={needDetails.geolocation}
                      />
                    )}
                  <div className="flex justify-between items-center mb-2 mt-2">
                    <Typography>
                      {lang === 'fr' && (
                        <span className="font-bold">Lieu:</span>
                      )}{' '}
                      {needDetails.needPlace}
                      {lang === 'ar' && (
                        <span className="font-bold">:مكان</span>
                      )}{' '}
                    </Typography>
                    <Typography>
                      {lang === 'fr' && (
                        <span className="font-bold">Localisation:</span>
                      )}
                      {needDetails.geolocation.lat !== 0 &&
                      needDetails.geolocation.lng !== 0 ? (
                        <a
                          onClick={() => openInMapApp(needDetails.geolocation)}
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
                        <span className="font-bold">:تحديد الموقع</span>
                      )}
                    </Typography>
                  </div>
                  <Typography>
                    {lang === 'fr' && (
                      <span className="font-bold">Ville la plus proche:</span>
                    )}{' '}
                    {needDetails.nearCity}{' '}
                    {lang === 'ar' && (
                      <span className="font-bold">:المدينة الأقرب</span>
                    )}
                  </Typography>
                  <Typography>
                    {lang === 'fr' && (
                      <span className="font-bold">Nombre d'habitants:</span>
                    )}{' '}
                    {needDetails.nbResident}{' '}
                    {lang === 'ar' && (
                      <span className="font-bold">:عدد السكان</span>
                    )}
                  </Typography>
                </div>
              </AccordionBody>
            </Accordion>
            <Accordion open={open === 1}>
              <AccordionHeader
                className={`${lang === 'ar' && 'justify-end'}`}
                onClick={() => handleOpen(1)}
              >
                {lang === 'ar' && (
                  <AccordionIcon id={1} open={open} marginClass="mr-auto" />
                )}
                <Typography variant="h5" color="indigo">
                  {lang === 'fr'
                    ? 'Etat actuel de la situation:'
                    : ':الوضع الحالي للموقف'}
                </Typography>
                {lang === 'fr' && (
                  <AccordionIcon id={1} open={open} marginClass="ml-auto" />
                )}
              </AccordionHeader>
              <AccordionBody>
                <div className="pl-2 mb-2">
                  <Typography
                    variant="h6"
                    color="teal"
                    className="mb-2 text-md"
                  >
                    {lang === 'fr'
                      ? 'Etat actuel de la situation:'
                      : ':طرق الوصول'}
                  </Typography>

                  <div className="pl-2">
                    <Typography>
                      {lang === 'fr' && (
                        <span className="font-bold">Les accés:</span>
                      )}{' '}
                      {needDetails.access}{' '}
                      {lang === 'ar' && (
                        <span className="font-bold">:الوصول</span>
                      )}
                    </Typography>
                    <Typography>
                      {lang === 'fr' && (
                        <span className="font-bold">Etat des accés:</span>
                      )}{' '}
                      {needDetails.accessStatus}{' '}
                      {lang === 'ar' && (
                        <span className="font-bold">:حالة الوصول</span>
                      )}
                    </Typography>
                  </div>
                </div>

                <div className="pl-2 mb-2">
                  <Typography
                    variant="h6"
                    color="teal"
                    className="mb-2 text-md"
                  >
                    {lang === 'fr'
                      ? 'Personnes déjà présent sur place:'
                      : ':الأشخاص الذين يتواجدون بالفعل في المكان'}
                  </Typography>
                  <div className="pl-2">
                    <Typography>
                      {lang === 'fr' && (
                        <span className="font-bold">Volontaires civiles:</span>
                      )}{' '}
                      <Chip
                        className="inline-block"
                        color={getPresenceColor(needDetails.nbActualVolontaire)}
                        value={getPresenceText(needDetails.nbActualVolontaire)}
                      />{' '}
                      {lang === 'ar' && (
                        <span className="font-bold">:المتطوعون المدنيون</span>
                      )}
                    </Typography>
                    <Typography>
                      {lang === 'fr' && (
                        <span className="font-bold">Secouristes:</span>
                      )}{' '}
                      <Chip
                        color={
                          getPresenceColor(
                            needDetails.nbActualFirstAid,
                          ) as colors
                        }
                        className="inline-block"
                        value={getPresenceText(needDetails.nbActualFirstAid)}
                      />{' '}
                      {lang === 'ar' && (
                        <span className="font-bold">:المسعفون</span>
                      )}
                    </Typography>
                  </div>
                </div>
              </AccordionBody>
            </Accordion>

            <Accordion open={open === 2}>
              <AccordionHeader
                className={`${lang === 'ar' && 'justify-end'}`}
                onClick={() => handleOpen(2)}
              >
                {lang === 'ar' && (
                  <AccordionIcon id={2} open={open} marginClass="mr-auto" />
                )}
                <Typography variant="h5" color="indigo">
                  {lang === 'fr' ? 'Liste des besoins' : ':قائمة الاحتياجات'}
                </Typography>
                {lang === 'fr' && (
                  <AccordionIcon id={2} open={open} marginClass="ml-auto" />
                )}
              </AccordionHeader>
              <AccordionBody>
                <div className="pl-2 mb-2">
                  <ul>
                    {needDetails.allNeeds.length > 0 ? (
                      needDetails.allNeeds.map((need, index) => (
                        <li key={index}>
                          <Typography>- {need}</Typography>
                        </li>
                      ))
                    ) : (
                      <Typography>N/R</Typography>
                    )}
                  </ul>
                </div>
              </AccordionBody>
            </Accordion>

            <Accordion open={open === 3}>
              <AccordionHeader
                className={`${lang === 'ar' && 'justify-end'}`}
                onClick={() => handleOpen(3)}
              >
                {lang === 'ar' && (
                  <AccordionIcon id={3} open={open} marginClass="mr-auto" />
                )}
                <Typography variant="h5" color="indigo">
                  {lang === 'fr' ? 'Contact sur place' : ':اتصال محلي'}
                </Typography>
                {lang === 'fr' && (
                  <AccordionIcon id={3} open={open} marginClass="ml-auto" />
                )}
              </AccordionHeader>
              <AccordionBody>
                <div className="pl-2">
                  <Typography>
                    {lang === 'fr' && (
                      <span className="font-bold">Nom/Prénom:</span>
                    )}{' '}
                    {needDetails.contactName}{' '}
                    {lang === 'ar' && (
                      <span className="font-bold">
                        :الاسم الشخصي/اسم العائلة
                      </span>
                    )}
                  </Typography>
                  <Typography>
                    <span className="font-bold">Tél (gsm):</span>{' '}
                    {needDetails.contactPhone}
                  </Typography>
                  <Typography>
                    <span className="font-bold">Whatsapp (+212):</span>{' '}
                    {needDetails.contactWhatsapp}
                  </Typography>
                </div>
              </AccordionBody>
            </Accordion>
          </div>
        </section>
      )}
    </div>
  );
};
