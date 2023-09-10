import { NewNeedDto } from "../../data/dtos/NewNeedDto";
import { NeedModelForm } from "../../data/models/NeedModelForm";

const needDtoFactory = (need: NeedModelForm): NewNeedDto => {
    return {
        long: need.locationInfo.long,
        lat: need.locationInfo.lat,
        alt: need.locationInfo.alt,
        needPlace: need.locationInfo.needPlace,
        nearCity: need.locationInfo.nearCity,
        area: need.locationInfo.area,
        district: need.locationInfo.district,
        access: need.situationStatus.access,
        accessStatus: need.situationStatus.accessStatus,
        accessDescription: need.situationStatus.accessDescription,
        nbDestroyedBuilding: need.situationStatus.nbDestroyedBuilding,
        nbResident: need.situationStatus.nbResident,
        nbActualVictim: need.situationStatus.nbActualVictim,
        nbMissingPeople: need.situationStatus.nbMissingPeople,
        nbActualVolontaire: need.needInfo.nbActualVolontaire,
        nbActualFirstAid: need.needInfo.nbActualFirstAid,
        allNeeds: need.needInfo.allNeeds,
        contactName: need.contactInfo.contactName,
        contactPhone: need.contactInfo.contactPhone,
        contactWhatsapp: need.contactInfo.contactWhatsapp,
        createdAt: new Date().toISOString(),
        status: "pending"
    }
}

export const needsServices = {
    createNeed: async (need: NeedModelForm) => {
        const needDto: NewNeedDto = needDtoFactory(need);
        
    }
}