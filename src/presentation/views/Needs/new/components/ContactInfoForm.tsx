import { Input } from "@material-tailwind/react"
import { IFormProps } from "../IFormProps"
import { ContactInfoModel } from "../../../../../data/models/NeedModelForm"
interface ContactInfoFormProps extends IFormProps{
    formData: ContactInfoModel
}
export const ContactInfoForm = ({formData,handleChange}:ContactInfoFormProps) => {
  return (
    <div className="flex flex-col gap-6">
    
        <Input  size="lg" name="contactName" label="Nom du contact sur place" crossOrigin="" onChange={handleChange} value={formData.contactName}/>
    
        <Input type="tel" size="lg" name="contactPhone" label="Tél du contact sur place" crossOrigin="" onChange={handleChange} value={formData.contactPhone}/>
    
    <Input type="tel" size="lg" name="contactWhatsapp" label="Whatsapp du contact sur place" onChange={handleChange} value={formData.contactWhatsapp} crossOrigin=""/>
    
</div>
  )
}
