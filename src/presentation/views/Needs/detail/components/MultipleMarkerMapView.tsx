
import { MapContainer,   TileLayer, Circle, Popup } from 'react-leaflet';
import { NeedDto } from '../../../../../data/dtos/NeedDto';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../../router/routes';
import { Button } from '@material-tailwind/react';

interface MultipleMarkerMapViewProps {
    needs: NeedDto[];
}

export const MultipleMarkerMapView = (props: MultipleMarkerMapViewProps) => {
   const navigate = useNavigate()
    const getMarkerColor = (status: string) => {
        return status === "waiting" ? "gray" : status === "pending" ? "orange" : status === "validated" ? "green" : "gray"
    }
    
  return (
    <div>
        <MapContainer center={{lat:31.6258257,lng:-7.9891608}} className='z-0' zoom={8} scrollWheelZoom={true} style={{height:"500px",width:"100%"}}>
        <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
            
            
            {
                props.needs.map((need,index) => {
                    return (
                        
                            <Circle color={getMarkerColor(need.status)} radius={4000} key={index} center={need.geolocation}>
                                <Popup>
                                    <Button onClick={() => navigate(`${ROUTES.NEED_DETAIL}/${need.id}`)}>Voir le détail</Button>
                                </Popup>
                            </Circle>
                    );
                })
            }
                
        </MapContainer>
    </div>
  )
}