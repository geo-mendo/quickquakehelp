import { Input, Select, Option } from '@material-tailwind/react';
import React from 'react';
import { HelperText } from './HelperText';
import { citiesSercices } from '../../../../../services/cities/citiesServices';
import { IFormProps } from '../IFormProps';
import { LocationInfoModel } from '../../../../../data/models/NeedModelForm';
import { useAtomValue } from 'jotai';
import { langAtom } from '../../../../../states/atoms';

interface LocationInfoFormProps extends IFormProps {
  formData: LocationInfoModel;
  handleSelectChange: (
    formKey: 'locationInfo' | 'situationStatus' | 'needInfo' | 'contactInfo',
    key: any,
    value: string,
  ) => void;
}
export const LocationInfoForm = ({
  formData,
  handleSelectChange,
  handleChange,
}: LocationInfoFormProps) => {
  const lang = useAtomValue(langAtom);
  const areasList = citiesSercices.getAreaList().map((area, index) => (
    <Option key={index} value={area}>
      {area}
    </Option>
  ));

  const districtsList = (area: string) => {
    return citiesSercices.getDistrictList(area).map((district, index) => (
      <Option key={index} value={district}>
        {district}
      </Option>
    ));
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Input
          size="lg"
          name="needPlace"
          label={lang === 'fr' ? 'Lieu' : 'مكان'}
          crossOrigin
          onChange={handleChange}
          value={formData.needPlace}
        />
      </div>
      <div>
        <Input
          size="lg"
          name="nearCity"
          label={lang === 'fr' ? 'Ville la plus proche' : 'المدينة الأقرب'}
          crossOrigin
          onChange={handleChange}
          value={formData.nearCity}
        />
      </div>
      <Select
        name="area"
        label={lang === 'fr' ? 'Région' : 'المنطقة'}
        onChange={(value) =>
          handleSelectChange('locationInfo', 'area', value as string)
        }
        value={formData.area}
        selected={(elem) =>
          elem &&
          React.cloneElement(elem, {
            className: 'flex items-center px-0 gap-2 pointer-events-none',
          })
        }
      >
        {areasList}
      </Select>
      <div>
        <Select
          name="district"
          label={lang === 'fr' ? 'Province' : 'الإقليم'}
          style={{ zIndex: 3000 }}
          onChange={(value) =>
            handleSelectChange('locationInfo', 'district', value as string)
          }
          selected={(elem) =>
            elem &&
            React.cloneElement(elem, {
              className: 'flex items-center px-0 gap-2 pointer-events-none',
            })
          }
        >
          {districtsList(formData.area)}
        </Select>
        <HelperText>
          {lang === 'fr'
            ? "Veuillez choisir d'abord une région."
            : 'الرجاء اختيار منطقة أولاً'}
        </HelperText>
      </div>
    </div>
  );
};
