import { useSetAtom } from "jotai";
import { useFirebaseDataSource } from "../../data/FirestoreDataSource";
import { NewNeedDto } from '../../data/dtos/NeedDto';
import { NeedModelForm } from "../../data/models/NeedModelForm";
import { needsAtom } from "../../states/atoms";

const replaceEmptyValue = (value: string | number) => value === ""  ? "N/R" : isNaN(value as number) ? 0 : value;

const needDtoFactory = ({needInfo,locationInfo,situationStatus,contactInfo}: NeedModelForm): NewNeedDto => {
    const newNeed = {
        geolocation:{
            coordinates:{
                long: parseFloat(locationInfo.long),
                lat: parseFloat(locationInfo.lat),
            },
            alt: parseFloat(locationInfo.alt)
        },
        needPlace: replaceEmptyValue(locationInfo.needPlace),
        nearCity: replaceEmptyValue(locationInfo.nearCity),
        area: replaceEmptyValue(locationInfo.area),
        district: replaceEmptyValue(locationInfo.district),
        access: replaceEmptyValue(situationStatus.access),
        accessStatus: replaceEmptyValue(situationStatus.accessStatus),
        accessDescription: situationStatus.accessDescription,
        nbDestroyedBuilding: replaceEmptyValue(parseInt(situationStatus.nbDestroyedBuilding)),
        nbResident: replaceEmptyValue(parseInt(situationStatus.nbResident)),
        nbActualVictim: replaceEmptyValue(parseInt(situationStatus.nbActualVictim)),
        nbMissingPeople: replaceEmptyValue(parseInt(situationStatus.nbMissingPeople)),
        nbActualVolontaire: replaceEmptyValue(parseInt(needInfo.nbActualVolontaire)),
        nbActualFirstAid: replaceEmptyValue(parseInt(needInfo.nbActualFirstAid)),
        allNeeds: needInfo.allNeeds,
        contactName: replaceEmptyValue(contactInfo.contactName),
        contactPhone: replaceEmptyValue(contactInfo.contactPhone),
        contactWhatsapp: replaceEmptyValue(contactInfo.contactWhatsapp),
        createdDate: new Date().toISOString(),
        status: "waiting"
    } as NewNeedDto

    return newNeed ;
}

export const needsServices = () => {

    const dataSource = useFirebaseDataSource();
    const setNeeds = useSetAtom(needsAtom)
   

    const createNeed = async (need: NeedModelForm) => {
        const needDto: NewNeedDto = needDtoFactory(need);
        return await dataSource.set("needs", needDto);
    }
    const getRealtimeNeeds = () => {
        return dataSource.getRealtimeDocs("needs", setNeeds);
    }

    const getNeedDetails = async (id: string) => {
        return await dataSource.getById("needs", id);
    }

    return {
        createNeed,
        getRealtimeNeeds,
        getNeedDetails
    }
}