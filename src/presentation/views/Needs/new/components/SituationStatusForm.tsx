import { Input, Select, Option } from '@material-tailwind/react';
import { IFormProps } from '../IFormProps';
import { SituationStatusModel } from '../../../../../data/models/NeedModelForm';
import { HelperText } from './HelperText';
import React from 'react';
import { useAtomValue } from 'jotai';
import { langAtom } from '../../../../../states/atoms';

interface SituationStatusProps extends IFormProps {
  formData: SituationStatusModel;
  handleSelectChange: (
    formKey: 'locationInfo' | 'situationStatus' | 'needInfo' | 'contactInfo',
    key: any,
    value: string,
  ) => void;
}
export const SituationStatusForm = ({
  formData,
  handleChange,
  handleSelectChange,
}: SituationStatusProps) => {
  const lang = useAtomValue(langAtom);
  return (
    <div className="flex flex-col gap-6">
      <Input
        size="lg"
        name="access"
        label={lang === 'fr' ? 'Accés' : 'الوصول'}
        crossOrigin
        onChange={handleChange}
        value={formData.access}
      />
      <Input
        size="lg"
        name="accessStatus"
        label={lang === 'fr' ? "Etat de l'accés" : 'حالة الوصول'}
        crossOrigin
        onChange={handleChange}
        value={formData.accessStatus}
      />

      <div>
        <Input
          type="number"
          size="lg"
          name="nbResident"
          label={lang === 'fr' ? 'Nombre de résidents' : 'عدد السكان'}
          crossOrigin
          onChange={handleChange}
          value={formData.nbResident}
        />
        <HelperText>
          {lang === 'fr'
            ? 'fournir un nombre approximatif'
            : 'تقديم عدد تقريبي'}
        </HelperText>
      </div>
      <Select
        name="nbActualVolontaire"
        label={lang === 'fr' ? 'Présence de volontaire' : 'وجود متطوعين'}
        style={{ zIndex: 3000 }}
        onChange={(value) =>
          handleSelectChange(
            'situationStatus',
            'nbActualVolontaire',
            value as string,
          )
        }
        selected={(elem) =>
          elem &&
          React.cloneElement(elem, {
            className: 'flex items-center px-0 gap-2 pointer-events-none',
          })
        }
      >
        <Option value="y">{lang === 'fr' ? 'Oui' : 'نعم'}</Option>
        <Option value="n">{lang === 'fr' ? 'Non' : 'لا'}</Option>
      </Select>

      <Select
        name="nbActualFirstAid"
        label={lang === 'fr' ? 'Présence de secouriste' : 'وجود مسعفين'}
        style={{ zIndex: 3000 }}
        onChange={(value) =>
          handleSelectChange(
            'situationStatus',
            'nbActualFirstAid',
            value as string,
          )
        }
        selected={(elem) =>
          elem &&
          React.cloneElement(elem, {
            className: 'flex items-center px-0 gap-2 pointer-events-none',
          })
        }
      >
        <Option value="y">{lang === 'fr' ? 'Oui' : 'نعم'}</Option>
        <Option value="n">{lang === 'fr' ? 'Non' : 'لا'}</Option>
      </Select>
    </div>
  );
};
