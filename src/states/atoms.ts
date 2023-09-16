import { atom } from 'jotai';
import { NeedDto } from '../data/dtos/NeedDto';
import { LatLngLiteral } from 'leaflet';
import { IFilterFields } from '../presentation/views/Needs/list/NeedListView';

export const coordinatesAtom = atom<LatLngLiteral>({ lng: 0, lat: 0 });

export const needsAtom = atom<NeedDto[]>([]);

export const needDetailsAtom = atom<NeedDto | null>(null);

export const allCoordinatesAtom = atom<LatLngLiteral[]>([]);

export const langAtom = atom<'fr' | 'ar'>('fr');

export const filtersLIsteViewAtom = atom<IFilterFields>({
  status: '',
  district: '',
});
