
import { LatLngLiteral } from 'leaflet';

export interface NeedDto {
    id: string;
    geolocation: LatLngLiteral;
    needPlace:string;
    nearCity:string;
    area:string;
    district:string;
    access: string;
    accessStatus: string;
    nbResident: string;
    nbActualVolontaire: string;
    nbActualFirstAid: string;
    allNeeds: string[];
    contactName: string;
    contactPhone: string;
    contactWhatsapp: string;
    createdDate: string;
    status: "waiting" |"pending" | "validated" ;
}

export interface NewNeedDto {
    geolocation: LatLngLiteral;
    needPlace:string;
    nearCity:string;
    area:string;
    district:string;
    access: string;
    accessStatus: string;
    nbResident: string;
    nbActualVolontaire: string;
    nbActualFirstAid: string;
    allNeeds: string[];
    contactName: string;
    contactPhone: string;
    contactWhatsapp: string;
    createdDate: string;
    status: "waiting" | "pending" | "validated" ;
}