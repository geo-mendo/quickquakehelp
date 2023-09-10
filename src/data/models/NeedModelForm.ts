export interface NeedModelForm {
    locationInfo: LocationInfoModel;
    situationStatus: SituationStatusModel;
    needInfo: NeedInfoModel; 
    contactInfo: ContactInfoModel;
}

export interface LocationInfoModel {
    long:string;
    lat:string;
    alt:string;
    needPlace:string;
    nearCity:string;
    area:string;
    district:string;
}

export interface SituationStatusModel {
    access: string;
    accessStatus: string;
    accessDescription: string;
    nbDestroyedBuilding: string;
    nbResident: string;
    nbActualVictim: string;
    nbMissingPeople: string;
}

export interface NeedInfoModel {
    nbActualVolontaire: string;
    nbActualFirstAid: string;
    allNeeds: string;
}

export interface ContactInfoModel {
    contactName: string;
    contactPhone: string;
    contactWhatsapp: string;
}