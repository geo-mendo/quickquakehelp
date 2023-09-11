import { LatLngLiteral} from 'leaflet'
import { useMemo, useRef } from 'react'
import { MapContainer, Marker,  TileLayer, useMapEvents } from 'react-leaflet';
import { useSetAtom } from 'jotai';
import { coordinatesAtom } from '../../../../../states/atoms';

interface LocationMarkerProps {
    position: LatLngLiteral;
}
const LocationMarker = (props:LocationMarkerProps) => {
    const setPosition= useSetAtom(coordinatesAtom)
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
      position={props.position}
      ref={markerRef}>
    </Marker>
  )
  
}


interface MapViewProps {
    position: LatLngLiteral;
    type: "static" | "dynamic";
}

export const MapView = (props: MapViewProps) => {
    
  return (
    <div>
        <MapContainer className='z-0' center={props.position} zoom={13} scrollWheelZoom={true} style={{height:"200px",width:"100%"}}>
        <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
            {
                props.type === "static" ?
                <Marker position={props.position}></Marker>
                :
                <LocationMarker position={props.position}/>
            }
        </MapContainer>
    </div>
  )
}
