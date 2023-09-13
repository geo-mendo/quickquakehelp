/* eslint-disable react-hooks/rules-of-hooks */
import { useAtom } from 'jotai';
import { useFirebaseDataSource } from '../../data/FirestoreDataSource';
import { NeedDto, NewNeedDto } from '../../data/dtos/NeedDto';
import { NeedModelForm } from '../../data/models/NeedModelForm';
import { needsAtom } from '../../states/atoms';
import { LatLngLiteral } from 'leaflet';

const replaceEmptyStringValue = (value: string | number) =>
  value === '' ? 'N/R' : value;

const needDtoFactory = (
  need: NeedModelForm,
  coordinates: LatLngLiteral,
): NewNeedDto => {
  const { needInfo, locationInfo, situationStatus, contactInfo } = need;
  const newNeed = {
    geolocation: {
      lat: coordinates.lat,
      lng: coordinates.lng,
    },
    needPlace: replaceEmptyStringValue(locationInfo.needPlace),
    nearCity: replaceEmptyStringValue(locationInfo.nearCity),
    area: replaceEmptyStringValue(locationInfo.area),
    district: replaceEmptyStringValue(locationInfo.district),
    access: replaceEmptyStringValue(situationStatus.access),
    accessStatus: replaceEmptyStringValue(situationStatus.accessStatus),
    nbResident: replaceEmptyStringValue(situationStatus.nbResident),
    nbActualVolontaire: replaceEmptyStringValue(
      situationStatus.nbActualVolontaire,
    ),
    nbActualFirstAid: replaceEmptyStringValue(situationStatus.nbActualFirstAid),
    allNeeds: needInfo.allNeeds,
    contactName: replaceEmptyStringValue(contactInfo.contactName),
    contactPhone: replaceEmptyStringValue(contactInfo.contactPhone),
    contactWhatsapp: replaceEmptyStringValue(contactInfo.contactWhatsapp),
    createdDate: new Date().toISOString(),
    status: 'waiting',
  } as NewNeedDto;

  return newNeed;
};

export const needsServices = () => {
  const dataSource = useFirebaseDataSource();
  const [needs, setNeeds] = useAtom(needsAtom);

  const createNeed = async (
    need: NeedModelForm,
    coordinates: LatLngLiteral,
  ) => {
    const needDto: NewNeedDto = needDtoFactory(need, coordinates);
    return await dataSource.set('needs', needDto);
  };
  const getRealtimeNeeds = () => {
    return dataSource.getRealtimeDocs('needs', setNeeds);
  };

  const getNeedDetails = (id: string): NeedDto | undefined => {
    const copyState = [...needs];
    const need = copyState.find((need) => need.id === id);
    if (!need) return;
    return need;
  };

  const changeNeedStatus = async (id: string, status: string) => {
    return await dataSource.update('needs', id, { status });
  };

  return {
    createNeed,
    changeNeedStatus,
    getRealtimeNeeds,
    getNeedDetails,
  };
};
