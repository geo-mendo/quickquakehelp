import { atom } from "jotai";

const coor = atom<GeolocationCoordinates>({ x: 0, y: 0 });