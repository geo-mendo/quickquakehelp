import { LatLng } from 'leaflet'
import { useMemo, useRef, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents, useMapEvent } from 'react-leaflet';
import { Button } from '@material-tailwind/react';

const LocationMarker = () => {
    const [position, setPosition] = useState<LatLng | null>(null)
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },

  })

  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current as any
        if (marker != null) {
          setPosition(marker.getLatLng() )
        }
      },
    }),
    [],
  )

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position as LatLng}
      ref={markerRef}>
    </Marker>
  )
  
}


interface MapViewProps {
    long: number ;
    lat: number;
    type: "static" | "dynamic";
}

export const MapView = (props: MapViewProps) => {
    
  return (
    <div>
        <MapContainer center={[props.lat,props.long]} zoom={13} scrollWheelZoom={true} style={{height:"200px",width:"100%"}}>
        <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
            {
                props.type === "static" ?
                <Marker position={{lng:props.long,lat:props.lat}}></Marker>
                :
                <LocationMarker/>
            }
        </MapContainer>
    </div>
  )
}
