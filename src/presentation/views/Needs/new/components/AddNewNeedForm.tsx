import {
  Typography,
  Checkbox,
  Button,
  Accordion,
  AccordionBody,
  AccordionHeader,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import React from 'react';
import { LocationInfoForm } from './LocationInfoForm';
import { SituationStatusForm } from './SituationStatusForm';
import { NeedModelForm } from '../../../../../data/models/NeedModelForm';
import { NeedInfoForm } from './NeedInfoForm';
import { ContactInfoForm } from './ContactInfoForm';
import { needsServices } from '../../../../../services/needs/needsServices';
import { notifSercice } from '../../../../../services/notifService';
import { MapView } from '../../detail/components/MapView';
import { useAtomValue } from 'jotai';
import { coordinatesAtom, langAtom } from '../../../../../states/atoms';
import { ROUTES } from '../../../../../router/routes';
import { useNavigate } from 'react-router-dom';

export function AccordionIcon(props: {
  id: number;
  open: number;
  marginClass?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        props.id === props.open ? 'rotate-180' : ''
      } h-5 w-5 transition-transform ${props.marginClass}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

const initialFormData: NeedModelForm = {
  locationInfo: {
    needPlace: '',
    nearCity: '',
    area: '',
    district: '',
  },
  situationStatus: {
    access: '',
    accessStatus: '',
    nbResident: '',
    nbActualVolontaire: '',
    nbActualFirstAid: '',
  },
  needInfo: {
    allNeeds: [],
  },
  contactInfo: {
    contactName: '',
    contactPhone: '',
    contactWhatsapp: '',
  },
};

export const AddNewNeedForm = () => {
  const lang = useAtomValue(langAtom);
  const navigate = useNavigate();
  const coordinates = useAtomValue(coordinatesAtom);

  const [open, setOpen] = React.useState(1);

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  const [attest, setAttest] = useState<boolean>(false);

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    window.document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
      }
    });
  }, []);

  const handleChangeLocationForm = (e: any) => {
    e.preventDefault();
    setFormData({
      ...formData,
      locationInfo: {
        ...formData.locationInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleChangeSituationStatusForm = (e: any) => {
    e.preventDefault();
    setFormData({
      ...formData,
      situationStatus: {
        ...formData.situationStatus,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleChangeAllNeeds = (
    need: string,
    actionType: 'save' | 'add' | 'remove',
  ) => {
    if (actionType === 'add') {
      const copyState = [...formData.needInfo.allNeeds];
      const nextIndex = copyState.length;
      copyState[nextIndex] = need;
      setFormData({
        ...formData,
        needInfo: { ...formData.needInfo, allNeeds: copyState },
      });
    }

    if (actionType === 'save') {
      const copyState = [...formData.needInfo.allNeeds];
      const lastIndex = copyState.length > 0 ? copyState.length - 1 : 0;
      copyState[lastIndex] = need;
      setFormData({
        ...formData,
        needInfo: { ...formData.needInfo, allNeeds: copyState },
      });
    }

    if (actionType === 'remove') {
      const copyState = [...formData.needInfo.allNeeds];
      const allNeeds = copyState.filter((item) => item !== need);
      setFormData({
        ...formData,
        needInfo: { ...formData.needInfo, allNeeds },
      });
    }
  };

  const handleChangeContactInfoForm = (e: any) => {
    e.preventDefault();
    setFormData({
      ...formData,
      contactInfo: { ...formData.contactInfo, [e.target.name]: e.target.value },
    });
  };

  const handleSelectChange = (
    formKey: 'locationInfo' | 'situationStatus' | 'needInfo' | 'contactInfo',
    key: any,
    value: string,
  ) => {
    if (formKey === 'locationInfo') {
      setFormData({
        ...formData,
        locationInfo: { ...formData.locationInfo, [key]: value },
      });
    }
    if (formKey === 'situationStatus') {
      setFormData({
        ...formData,
        situationStatus: { ...formData.situationStatus, [key]: value },
      });
    }
    if (formKey === 'needInfo') {
      setFormData({
        ...formData,
        needInfo: { ...formData.needInfo, [key]: value },
      });
    }
    if (formKey === 'contactInfo') {
      setFormData({
        ...formData,
        contactInfo: { ...formData.contactInfo, [key]: value },
      });
    }
  };

  const needService = needsServices();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    needService
      .createNeed(formData, coordinates)
      .then(() => {
        setFormData(initialFormData);
        notifSercice.success(
          lang === 'fr' ? 'Votre demande a été enregistrée' : 'تم تسجيل طلبك',
        );
        navigate(ROUTES.NEED_LIST);
      })
      .catch((error) => {
        console.log(error);
        notifSercice.error(
          lang === 'fr'
            ? "Erreur lors de l'enregistrement"
            : 'خطأ أثناء التسجيل',
        );
      });
  };

  return (
    <div className=" h-full">
      <Typography variant="h4" color="orange">
        {lang === 'fr' ? "Besoin d'aide" : 'طلب مساعدة'}
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        {lang === 'fr' ? 'Remplissez le formulaire' : 'املأ الاستمارة'}
      </Typography>
      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={handleSubmit}
      >
        <div className="mb-4 flex flex-col gap-6">
          <Accordion open={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)}>
              {lang === 'ar' && (
                <AccordionIcon id={1} open={open} marginClass="mr-auto" />
              )}
              {lang === 'fr'
                ? 'Informations de localisation'
                : 'معلومات الموقع'}
              {lang === 'fr' && (
                <AccordionIcon id={1} open={open} marginClass="ml-auto" />
              )}
            </AccordionHeader>
            <AccordionBody>
              <MapView type="dynamic" position={coordinates} />
              <div className="mt-4">
                <LocationInfoForm
                  formData={formData.locationInfo}
                  handleSelectChange={handleSelectChange}
                  handleChange={handleChangeLocationForm}
                />
              </div>
            </AccordionBody>
          </Accordion>
          <Accordion open={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)}>
              {lang === 'ar' && (
                <AccordionIcon id={2} open={open} marginClass="mr-auto" />
              )}
              {lang === 'fr' ? 'Etat de la situation' : 'حالة الوضع'}
              {lang === 'fr' && (
                <AccordionIcon id={2} open={open} marginClass="ml-auto" />
              )}
            </AccordionHeader>
            <AccordionBody>
              <SituationStatusForm
                formData={formData.situationStatus}
                handleChange={handleChangeSituationStatusForm}
                handleSelectChange={handleSelectChange}
              />
            </AccordionBody>
          </Accordion>
          <Accordion open={open === 3}>
            <AccordionHeader onClick={() => handleOpen(3)}>
              {lang === 'ar' && (
                <AccordionIcon id={3} open={open} marginClass="mr-auto" />
              )}
              {lang === 'fr' ? 'Informations de contact' : 'معلومات الاتصال'}
              {lang === 'fr' && (
                <AccordionIcon id={3} open={open} marginClass="ml-auto" />
              )}
            </AccordionHeader>
            <AccordionBody>
              <ContactInfoForm
                formData={formData.contactInfo}
                handleChange={handleChangeContactInfoForm}
              />
            </AccordionBody>
          </Accordion>
          <NeedInfoForm
            formData={formData.needInfo}
            handleNeedsChange={handleChangeAllNeeds}
          />
        </div>
        <Checkbox
          onChange={() => setAttest(!attest)}
          checked={attest}
          crossOrigin
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
              {lang === 'fr'
                ? "J'atteste de la véracité de mes informations"
                : 'أؤكد صحة المعلومات التي قدمتها'}
            </Typography>
          }
          color="blue"
          containerProps={{ className: '-ml-2.5' }}
        />
        <Button
          disabled={!attest}
          type="submit"
          className="mt-6 bg-green-500"
          fullWidth
        >
          {lang === 'fr' ? 'Enregistrer' : 'تسجيل'}
        </Button>
      </form>
    </div>
  );
};
