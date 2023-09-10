import { Input } from "@material-tailwind/react"
import { IFormProps } from "../IFormProps"
import { SituationStatusModel } from "../../../../../data/models/NeedModelForm"
import { HelperText } from "./HelperText"

interface SituationStatusProps extends IFormProps{
    formData: SituationStatusModel
}
export const SituationStatusForm = ({formData,handleChange}: SituationStatusProps) => {
  return (
    <div className="flex flex-col gap-6">
        <Input size="lg" name="access" label="Accés" crossOrigin onChange={handleChange} value={formData.access}/>
        <Input size="lg" name="accessStatus" label="Etat des accés" crossOrigin onChange={handleChange} value={formData.accessStatus}/>
        <Input size="lg" name="accessDescription" label="Description des accés" crossOrigin onChange={handleChange} value={formData.accessDescription}/>
        <div>
        <Input type="number" size="lg" name="nbDestroyedBuilding" label="Nombre de batiment détruit" crossOrigin onChange={handleChange} value={formData.nbDestroyedBuilding}/>
        <HelperText>
            fournir un nombre approximatif
        </HelperText>
        </div>
        <div>
        <Input type="number" size="lg" name="nbResident" label="Nombre d'habitant" crossOrigin onChange={handleChange} value={formData.nbResident}/>
        <HelperText>
            fournir un nombre approximatif
        </HelperText>
        </div>
        <div>
        <Input type="number" size="lg" name="nbActualVictim" label="Nombre actuel de victime" crossOrigin onChange={handleChange} value={formData.nbActualVictim}/>
        <HelperText>
            fournir un nombre approximatif
        </HelperText>
        </div>
        <div>
        <Input type="number" size="lg" name="nbMissingPeople" label="Nombre de personne portée disparu" crossOrigin onChange={handleChange} value={formData.nbMissingPeople}/>
        <HelperText>
            fournir un nombre approximatif
        </HelperText>
        </div>
    </div>
  )
}
