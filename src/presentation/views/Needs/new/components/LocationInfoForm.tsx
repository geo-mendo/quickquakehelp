import { Input, Select, Option } from "@material-tailwind/react"
import React from "react"
import { HelperText } from "./HelperText"
import { citiesSercices } from "../../../../../services/cities/citiesServices";
import { IFormProps } from "../IFormProps";
import { LocationInfoModel } from "../../../../../data/models/NeedModelForm";

interface LocationInfoFormProps extends IFormProps {
    formData: LocationInfoModel
}
export const LocationInfoForm = ({formData,handleSelectChange,handleChange}: LocationInfoFormProps) => {
    const areasList = 
    citiesSercices
    .getAreaList()
    .map((area, index) => <Option key={index} value={area}>{area}</Option>);

    const districtsList = (area: string) => {
        return citiesSercices
        .getDistrictList(area)
        .map((district, index) => <Option key={index} value={district}>{district}</Option>);
    }
    
  return (
    <div className="flex flex-col gap-6">
        {/* <Input size="lg" name="long" label="Longitude" crossOrigin onChange={handleChange} value={formData.long}/>
          <Input size="lg" name="lat" label="Latitude" crossOrigin onChange={handleChange} value={formData.lat}/>
          <Input size="lg" name="alt" label="Altitude" crossOrigin onChange={handleChange} value={formData.alt}/> */}
          <div>
            <Input size="lg" name="needPlace" label="Lieu du besoin" crossOrigin onChange={handleChange} value={formData.needPlace}/>
            <HelperText>
                Ville/Village/Lieu-dit/Commune/Douar...
            </HelperText>
          </div>
          <div>
            <Input size="lg" name="nearCity" label="Ville la plus proche" crossOrigin onChange={handleChange} value={formData.nearCity}/>
            <HelperText>
                Dans le cas où le lieu n'est pas une ville principale.
            </HelperText>
          </div>
          <Select 
           name="area" 
           label="Région" 
           onChange={(value) => handleSelectChange("area",value as string) } 
           value={formData.area}
          >
            {areasList}
            </Select>
            <div>
            <Select 
             name="district" 
             label="Province" 
             onChange={(value) => handleSelectChange("district",value as string) } 
             selected={(elem) => elem && React.cloneElement(elem,{className: "flex items-center px-0 gap-2 pointer-events-none"})}
            >
            {districtsList(formData.area)}
            </Select>
            <HelperText>
                Veuillez choisir d'abord une région.
            </HelperText>
            </div>
    </div>
  )
}
