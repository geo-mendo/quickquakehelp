import { Input, Textarea } from "@material-tailwind/react"
import { HelperText } from "./HelperText"
import { NeedInfoModel } from "../../../../../data/models/NeedModelForm"
import { IFormProps } from "../IFormProps"

interface NeedInfoFormProps extends IFormProps{
    formData: NeedInfoModel
}
export const NeedInfoForm = ({formData,handleChange}:NeedInfoFormProps) => {
  return (
    <div className="flex flex-col gap-6">
        <div>
            <Input type="number" size="lg" name="nbActualVolontaire" label="Nombre actuel de volontaire" crossOrigin onChange={handleChange} value={formData.nbActualVolontaire}/>
            <HelperText>
                fournir un nombre approximatif
            </HelperText>
        </div>
        <div>
            <Input type="number"  size="lg" name="nbActualFirstAid" label="Nombre actuel de secouriste" crossOrigin onChange={handleChange} value={formData.nbActualFirstAid}/>
            <HelperText>
                fournir un nombre approximatif
            </HelperText>
        </div>
        <div>
        <Textarea  size="lg" name="allNeeds" label="Liste des besoins principaux" onChange={handleChange} value={formData.allNeeds}/>
        <HelperText>
            Lister de manière simple les besoins principaux (ex: eau, nourriture, couverture, etc...)
        </HelperText>
        </div>
    </div>
  )
}
