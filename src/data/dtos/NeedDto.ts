import { IGeolocation } from "../models/IGeolocation";

export interface NeedDto {
    id: string;
    geolocation: IGeolocation;
    needPlace:string;
    nearCity:string;
    area:string;
    district:string;
    access: string;
    accessStatus: string;
    accessDescription: string;
    nbDestroyedBuilding: number;
    nbResident: number;
    nbActualVictim: number;
    nbMissingPeople: number;
    nbActualVolontaire: number;
    nbActualFirstAid: number;
    allNeeds: string[];
    contactName: string;
    contactPhone: string;
    contactWhatsapp: string;
    createdDate: string;
    status: "waiting" |"pending" | "validated" ;
}

export interface NewNeedDto {
    geolocation: IGeolocation;
    needPlace:string;
    nearCity:string;
    area:string;
    district:string;
    access: string;
    accessStatus: string;
    accessDescription: string;
    nbDestroyedBuilding: number;
    nbResident: number;
    nbActualVictim: number;
    nbMissingPeople: number;
    nbActualVolontaire: number;
    nbActualFirstAid: number;
    allNeeds: string[];
    contactName: string;
    contactPhone: string;
    contactWhatsapp: string;
    createdDate: string;
    status: "waiting" | "pending" | "validated" ;
}