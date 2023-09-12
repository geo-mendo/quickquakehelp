import { Input, Select,Option } from "@material-tailwind/react"
import { IFormProps } from "../IFormProps"
import { SituationStatusModel } from "../../../../../data/models/NeedModelForm"
import { HelperText } from "./HelperText"
import React from "react"

interface SituationStatusProps extends IFormProps{
    formData: SituationStatusModel
    handleSelectChange:(
        formKey: "locationInfo" | "situationStatus" | "needInfo" | "contactInfo",
        key: any,
        value: string
        ) => void
}
export const SituationStatusForm = ({formData,handleChange,handleSelectChange}: SituationStatusProps) => {
  return (
    <div className="flex flex-col gap-6">
        <Input size="lg" name="access" label="Accés" crossOrigin onChange={handleChange} value={formData.access}/>
        <Input size="lg" name="accessStatus" label="Etat des accés" crossOrigin onChange={handleChange} value={formData.accessStatus}/>
        
        <div>
        <Input type="number" size="lg" name="nbResident" label="Nombre d'habitant" crossOrigin onChange={handleChange} value={formData.nbResident}/>
        <HelperText>
            fournir un nombre approximatif
        </HelperText>
        </div>
        <Select 
             name="nbActualVolontaire" 
             label="Présence de volontaire" 
             style={{zIndex: 3000}}
             onChange={(value) => handleSelectChange("situationStatus","nbActualVolontaire",value as string) } 
             selected={(elem) => elem && React.cloneElement(elem,{className: "flex items-center px-0 gap-2 pointer-events-none"})}
            >
              <Option value="y">Oui</Option>
              <Option value="n">Non</Option>
            </Select>

            <Select 
             name="nbActualFirstAid" 
             label="Présence de secouriste" 
             style={{zIndex: 3000}}
             onChange={(value) => handleSelectChange("situationStatus","nbActualFirstAid",value as string) } 
             selected={(elem) => elem && React.cloneElement(elem,{className: "flex items-center px-0 gap-2 pointer-events-none"})}
            >
              <Option value="y">Oui</Option>
              <Option value="n">Non</Option>
            </Select>
    </div>
  )
}
