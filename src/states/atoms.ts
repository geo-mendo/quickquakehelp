import { atom } from "jotai";
import { NeedDto } from "../data/dtos/NeedDto";

// const coor = atom<GeolocationCoordinates>({ x: 0, y: 0 });

export const needsAtom = atom<NeedDto[]>([]);