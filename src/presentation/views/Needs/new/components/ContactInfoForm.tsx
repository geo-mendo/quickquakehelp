import { Input } from '@material-tailwind/react';
import { IFormProps } from '../IFormProps';
import { ContactInfoModel } from '../../../../../data/models/NeedModelForm';
import { useAtomValue } from 'jotai';
import { langAtom } from '../../../../../states/atoms';
interface ContactInfoFormProps extends IFormProps {
  formData: ContactInfoModel;
}
export const ContactInfoForm = ({
  formData,
  handleChange,
}: ContactInfoFormProps) => {
  const lang = useAtomValue(langAtom);
  return (
    <div className="flex flex-col gap-6">
      <Input
        size="lg"
        name="contactName"
        label={lang === 'fr' ? 'Nom du contact' : 'اسم المسؤول'}
        crossOrigin=""
        onChange={handleChange}
        value={formData.contactName}
      />

      <Input
        type="tel"
        size="lg"
        name="contactPhone"
        label={lang === 'fr' ? 'Tél du contact' : 'رقم هاتف المسؤول'}
        crossOrigin=""
        onChange={handleChange}
        value={formData.contactPhone}
      />

      <Input
        type="tel"
        size="lg"
        name="contactWhatsapp"
        label={lang === 'fr' ? 'Whatsapp du contact' : 'رقم واتساب المسؤول'}
        onChange={handleChange}
        value={formData.contactWhatsapp}
        crossOrigin=""
      />
    </div>
  );
};
