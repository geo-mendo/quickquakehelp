import { LatLngLiteral } from 'leaflet';
import { useEffect, useMemo, useRef } from 'react';
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { useSetAtom } from 'jotai';
import { coordinatesAtom } from '../../../../../states/atoms';
import L from 'leaflet'; // Import L from leaflet to start

interface LocationMarkerProps {
  position: LatLngLiteral;
}
const LocationMarker = (props: LocationMarkerProps) => {
  const setPosition = useSetAtom(coordinatesAtom);

  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current as any;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    [],
  );

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={props.position}
      ref={markerRef}
    ></Marker>
  );
};

const LocateControl: React.FC = () => {
  const map = useMap();

  useEffect(() => {
    const locateButton = new L.Control({ position: 'bottomleft' });

    locateButton.onAdd = () => {
      const container = L.DomUtil.create(
        'div',
        'leaflet-bar leaflet-control leaflet-control-custom',
      );
      container.innerHTML = `
      <button class='bg-white shadow-md rounded p-2 text-black border-none'>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pin-map" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z"/>
        <path fill-rule="evenodd" d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"/>
      </svg>
    </button>
    `;

      container.onclick = () => map.locate({ setView: true });

      return container;
    };

    locateButton.addTo(map);

    return () => {
      map.removeControl(locateButton);
    };
  }, [map]);

  return null;
};

interface MapViewProps {
  position: LatLngLiteral;
  type: 'static' | 'dynamic';
}

export const MapView = (props: MapViewProps) => {
  return (
    <div>
      <MapContainer
        className="z-0"
        center={props.position}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '200px', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {props.type === 'static' ? (
          <Marker position={props.position}></Marker>
        ) : (
          <LocationMarker position={props.position} />
        )}
        <LocateControl />
      </MapContainer>
    </div>
  );
};
