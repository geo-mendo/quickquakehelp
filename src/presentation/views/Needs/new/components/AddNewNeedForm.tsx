import { Typography, Checkbox, Button, Accordion, AccordionBody, AccordionHeader } from "@material-tailwind/react"
import { HelperText } from "./HelperText"
import { useState } from "react";
import React from "react";
import { LocationInfoForm } from "./LocationInfoForm";
import { SituationStatusForm } from "./SituationStatusForm";
import { NeedModelForm } from "../../../../../data/models/NeedModelForm";
import { NeedInfoForm } from "./NeedInfoForm";
import { ContactInfoForm } from "./ContactInfoForm";
import { needsServices } from "../../../../../services/needs/needsServices";
import { notifSercice } from "../../../../../services/notifService";
import { MapView } from "../../detail/components/MapView";
import { useAtomValue } from 'jotai';
import { coordinatesAtom } from "../../../../../states/atoms";


export function AccordionIcon(props:{ id:number, open:number }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={`${props.id === props.open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    );
  }

  const initialFormData: NeedModelForm = {
    locationInfo: {
        needPlace:"",
        nearCity:"",
        area:"",
        district:""
    },
    situationStatus :{
        access: "",
        accessStatus: "",
        nbResident: "",
        nbActualVolontaire: "",
        nbActualFirstAid: "",
    },
    needInfo: {
        allNeeds: [],
    },
    contactInfo: {
        contactName: "",
        contactPhone: "",
        contactWhatsapp: "",
    }
}

export const AddNewNeedForm = () => {

  const coordinates = useAtomValue(coordinatesAtom);
    
    const [open, setOpen] = React.useState(1);
    
    const handleOpen = (value:number) => setOpen(open === value ? 0 : value);
    
    const [attest,setAttest] = useState<boolean>(false);


    const [formData, setFormData] = useState(initialFormData);
    
    const handleChangeLocationForm = (e: any) => {
        setFormData({...formData, locationInfo:{...formData.locationInfo, [e.target.name]: e.target.value}});
    }

    const handleChangeSituationStatusForm = (e: any) => {
        setFormData({...formData, situationStatus:{...formData.situationStatus, [e.target.name]: e.target.value}});
    }

    const handleChangeAllNeeds = (need: string, actionType: "save"|"add" |"remove") => {
        switch (actionType) {
          case "save":
            let copyState = [...formData.needInfo.allNeeds];
            const lastIndex = copyState.length > 0 ? copyState.length - 1 : 0;
            copyState[lastIndex] = need;
            setFormData({...formData, needInfo:{...formData.needInfo, allNeeds: copyState}});
            break;
            case "add":
              let copyState2 = [...formData.needInfo.allNeeds];
            const nextIndex = copyState2.length;
            copyState2[nextIndex] = need;
            setFormData({...formData, needInfo:{...formData.needInfo, allNeeds: copyState2}});
                setFormData({...formData, needInfo:{...formData.needInfo, allNeeds: [...formData.needInfo.allNeeds, need]}});
                break;
            case "remove":
                let copyState3 = [...formData.needInfo.allNeeds];
                const allNeeds = copyState3.filter((item) => item !== need);
                setFormData({...formData, needInfo:{...formData.needInfo, allNeeds}});
            break;
    }
    }
    
    const handleChangeContactInfoForm = (e: any) => {
        setFormData({...formData, contactInfo:{...formData.contactInfo, [e.target.name]: e.target.value}});
    }
    
    const handleSelectChange = (
      formKey: "locationInfo" | "situationStatus" | "needInfo" | "contactInfo",
      key: any,
      value: string
      ) => {
        if(formKey === "locationInfo"){
          setFormData({...formData, locationInfo:{...formData.locationInfo, [key]: value}});
        }
        if(formKey === "situationStatus"){
          setFormData({...formData, situationStatus:{...formData.situationStatus, [key]: value}});
        }
        if(formKey === "needInfo"){
          setFormData({...formData, needInfo:{...formData.needInfo, [key]: value}});
        }
        if(formKey === "contactInfo"){
          setFormData({...formData, contactInfo:{...formData.contactInfo, [key]: value}});
        }
    }
    
    const needService = needsServices();
    const handleSubmit = (e: any) => {
        e.preventDefault();
        needService
        .createNeed(formData, coordinates)
        .then(() => {
      notifSercice.success("Votre demande d'aide à été enregistré avec succès")
    })
    .catch((error) => {
        console.log(error);
        notifSercice.error("Une erreur est survenue lors de l'enregistrement de votre demande d'aide. Veuillez réessayer")
    });
   }

   

  return (
    <div className="overflow-scroll h-full">
      <Typography variant="h4" color="orange">
        Besoin d'aide
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Entrer les détails pour identifier votre besoin.
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col gap-6">
        <Accordion open={open === 1} icon={<AccordionIcon id={1} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(1)}>
            Informations de localisation
        </AccordionHeader>
        <AccordionBody >
          <MapView type="dynamic" position={coordinates}/>
            <HelperText>Cliquez sur la carte pour vous localiser (allumer le gps et accepter la localisation)</HelperText>
            <div className="mt-4">
              <LocationInfoForm 
                formData={formData.locationInfo} 
                handleSelectChange={handleSelectChange} 
                handleChange={handleChangeLocationForm}
              />
            </div>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} icon={<AccordionIcon id={2} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(2)}>
          Etat de la situation
        </AccordionHeader>
        <AccordionBody>
          <SituationStatusForm
            formData={formData.situationStatus}
            handleChange={handleChangeSituationStatusForm}
            handleSelectChange={handleSelectChange}
          />
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} icon={<AccordionIcon id={3} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(3)}>
          Informations sur le contact
        </AccordionHeader>
        <AccordionBody>
          <ContactInfoForm
            formData={formData.contactInfo}
            handleChange={handleChangeContactInfoForm}
          />
        </AccordionBody>
      </Accordion>
      <NeedInfoForm
            formData={formData.needInfo}
            handleNeedsChange={handleChangeAllNeeds}
          />
        </div>
        <Checkbox
        onChange={() => setAttest(!attest)}
        checked={attest}
        crossOrigin
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
             J'atteste de la véracité de mes informations
            </Typography>
          }
          color="blue"
          containerProps={{ className: "-ml-2.5" }}
        />
        <Button disabled={!attest} type="submit" className="mt-6 bg-green-500" fullWidth>
          Valider
        </Button>
      </form>
    </div>
  )
}
