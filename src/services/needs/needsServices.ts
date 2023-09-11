

import { useSetAtom } from "jotai";
import { useFirebaseDataSource } from "../../data/FirestoreDataSource";
import { NewNeedDto } from '../../data/dtos/NeedDto';
import { NeedModelForm } from "../../data/models/NeedModelForm";
import { needsAtom } from "../../states/atoms";
import { LatLngLiteral } from 'leaflet';

const replaceEmptyStringValue = (value: string | number) => value === ""  ? "N/R" : value;

const needDtoFactory = (need: NeedModelForm, coordinates: LatLngLiteral): NewNeedDto => {

    const {needInfo,locationInfo,situationStatus,contactInfo} = need;
    const newNeed = {
        geolocation:{
            lat: coordinates.lat,
            lng: coordinates.lng
        },
        needPlace: replaceEmptyStringValue(locationInfo.needPlace),
        nearCity: replaceEmptyStringValue(locationInfo.nearCity),
        area: replaceEmptyStringValue(locationInfo.area),
        district: replaceEmptyStringValue(locationInfo.district),
        access: replaceEmptyStringValue(situationStatus.access),
        accessStatus: replaceEmptyStringValue(situationStatus.accessStatus),
        accessDescription: situationStatus.accessDescription,
        nbDestroyedBuilding: replaceEmptyStringValue(situationStatus.nbDestroyedBuilding),
        nbResident: replaceEmptyStringValue(situationStatus.nbResident),
        nbActualVictim: replaceEmptyStringValue(situationStatus.nbActualVictim),
        nbMissingPeople: replaceEmptyStringValue(situationStatus.nbMissingPeople),
        nbActualVolontaire: replaceEmptyStringValue(needInfo.nbActualVolontaire),
        nbActualFirstAid: replaceEmptyStringValue(needInfo.nbActualFirstAid),
        allNeeds: needInfo.allNeeds,
        contactName: replaceEmptyStringValue(contactInfo.contactName),
        contactPhone: replaceEmptyStringValue(contactInfo.contactPhone),
        contactWhatsapp: replaceEmptyStringValue(contactInfo.contactWhatsapp),
        createdDate: new Date().toISOString(),
        status: "waiting"
    } as NewNeedDto

    return newNeed ;
}

export const needsServices = () => {

    const dataSource = useFirebaseDataSource();
    const setNeeds = useSetAtom(needsAtom)
   

    const createNeed = async (need: NeedModelForm, coordinates: LatLngLiteral) => {
        const needDto: NewNeedDto = needDtoFactory(need,coordinates);
        return await dataSource.set("needs", needDto);
    }
    const getRealtimeNeeds = () => {
        return dataSource.getRealtimeDocs("needs", setNeeds);
    }

    const getNeedDetails = async (id: string) => {
        return await dataSource.getById("needs", id);
    }

    const changeNeedStatus = async (id: string, status: string) => {
        return await dataSource.update("needs", id, {status});
    }

    return {
        createNeed,
        changeNeedStatus,
        getRealtimeNeeds,
        getNeedDetails
    }
}