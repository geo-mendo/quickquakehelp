export interface NeedModelForm {
    locationInfo: LocationInfoModel;
    situationStatus: SituationStatusModel;
    needInfo: NeedInfoModel; 
    contactInfo: ContactInfoModel;
}

export interface LocationInfoModel {
    needPlace:string;
    nearCity:string;
    area:string;
    district:string;
}

export interface SituationStatusModel {
    access: string;
    accessStatus: string;
    nbResident: string;
    nbActualVolontaire: string;
    nbActualFirstAid: string;
}

export interface NeedInfoModel {
    
    allNeeds: string[];
}

export interface ContactInfoModel {
    contactName: string;
    contactPhone: string;
    contactWhatsapp: string;
}