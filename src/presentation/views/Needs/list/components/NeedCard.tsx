import { Card, CardBody, Typography, CardFooter, Button } from "@material-tailwind/react"
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../../router/routes";
import { openInMapApp } from "../../../../../services/mapService";
import { LatLngLiteral } from 'leaflet';

interface NeedCardProps {
    district: string;
    needPlace: string;
    geolocation: LatLngLiteral;
    needsList: string[];
    id:string;
}

export const NeedCard = (props:NeedCardProps) => {


    const navigate = useNavigate()

    const goToDetails = () => {
        navigate(`${ROUTES.NEED_DETAIL}/${props.id}`)
    }

  return (
    <Card key={props.id} className="mt-10 w-full">
      <CardBody>
        <Typography variant="h5" color="indigo" className="mb-2">
          Province de {props.district}
        </Typography>
        <div className="flex justify-between items-center px-2 mb-2">
            <Typography>
            <span className="font-bold">Lieu:</span> {props.needPlace} 
            </Typography>
            <Typography>
                <span className="font-bold">Localisation:</span> 
                {
                  props.geolocation.lat && props.geolocation.lng ?
                  <a onClick={()=>openInMapApp(props.geolocation)} className=" cursor-pointer inline-block text-blue-500" > <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </svg> </a>
                : "N/R"
                }
            </Typography>
        </div>
        <div className="px-2">
            <Typography className="font-bold">
                Liste des besoins:
            </Typography>
            <ul className="list-disc list-inside">
                {
                    props.needsList.map((need, index) => <li key={index}>{need}</li>)
                }
            </ul>
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <a href="#" className="inline-block">
          <Button size="sm" variant="text" color="blue" onClick={goToDetails} className="flex items-center gap-2">
            Voir les détails
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Button>
        </a>
      </CardFooter>
    </Card>
  )
}
