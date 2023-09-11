import {  useEffect } from "react"
import { needsServices } from '../../../../services/needs/needsServices';
import { useAtomValue } from 'jotai';
import { needsAtom } from '../../../../states/atoms';
import { NeedCard } from "./components/NeedCard";
import { AppNavBar } from "../../../AppNavBar";
import { MultipleMarkerMapView } from "../detail/components/MultipleMarkerMapView";
import { Typography } from '@material-tailwind/react';


export const NeedListView = () => {

  
  const needs = useAtomValue(needsAtom)
  const needsService = needsServices()
  
  useEffect(() => {
    const unsubscribe = needsService.getRealtimeNeeds()

    return () => {
      unsubscribe();
    }
  }, [])

  
  

  return (
    <div className="bg-gray-200">
      <AppNavBar/>
      <div className="px-5 pb-8 ">
        {
          needs.length > 0 && <MultipleMarkerMapView needs={needs}  />
        }
      {
        needs.length > 0 ?
        needs.map((need) => 
        <NeedCard 
          id={need.id} 
          district={need.district}
          needPlace={need.needPlace}
          geolocation={need.geolocation}
          needsList={need.allNeeds}
        />)
        : <Typography variant="h5" color="indigo" className="my-4">Il n'y a aucune demande pour l'instant</Typography>
      }
      </div>
    </div>
  )
}
