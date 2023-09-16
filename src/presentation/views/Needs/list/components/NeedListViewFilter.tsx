import { Select, Option, Button, MenuList } from '@material-tailwind/react';
import { useAtomValue, useSetAtom } from 'jotai/react';
import React, { useState } from 'react';
import { filtersLIsteViewAtom, langAtom } from '../../../../../states/atoms';
import { citiesSercices } from '../../../../../services/cities/citiesServices';
import { IFilterFields } from '../NeedListView';

export const NeedListViewFilter = ({
  closeMenu,
}: {
  closeMenu: () => void;
}) => {
  const lang = useAtomValue(langAtom);
  const submitFilter = useSetAtom(filtersLIsteViewAtom);
  const initialFilters = {
    status: '',
    district: '',
  };
  const [filters, setFilters] = useState<IFilterFields>(initialFilters);

  const [area, setArea] = useState('');

  const addNewFilter = (field: string, value: string) => {
    setFilters({ ...filters, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(filters);
    if (filters.status === '' && filters.district === '') return;
    submitFilter(filters);
    closeMenu();
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setArea('');
    submitFilter(initialFilters);
    closeMenu();
  };

  return (
    <MenuList>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <Select
          label={lang === 'fr' ? 'Status' : 'الحالة'}
          onChange={(value) => addNewFilter('status', value as string)}
        >
          <Option value="validated">
            {lang === 'fr' ? 'Terminé' : 'انتهى '}
          </Option>
          <Option value="pending">
            {lang === 'fr' ? 'En cours' : 'الجاري '}
          </Option>
          <Option value="waiting">
            {lang === 'fr' ? 'En attente' : 'في الانتظار '}
          </Option>
        </Select>
        <Select
          name="area"
          label={lang === 'fr' ? 'Région' : 'المنطقة'}
          onChange={(value) => setArea(value as string)}
          value={area}
          selected={(elem) =>
            elem &&
            React.cloneElement(elem, {
              className: 'flex items-center px-0 gap-2 pointer-events-none',
            })
          }
        >
          {citiesSercices.getAreaList().map((area, index) => (
            <Option key={index} value={area}>
              {area}
            </Option>
          ))}
        </Select>

        <Select
          name="district"
          label={lang === 'fr' ? 'Province' : 'الإقليم'}
          style={{ zIndex: 3000 }}
          onChange={(value) => addNewFilter('district', value as string)}
          selected={(elem) =>
            elem &&
            React.cloneElement(elem, {
              className: 'flex items-center px-0 gap-2 pointer-events-none',
            })
          }
        >
          {citiesSercices.getDistrictList(area).map((district, index) => (
            <Option key={index} value={district}>
              {district}
            </Option>
          ))}
        </Select>

        <hr className="my-3" />
        <div className="flex gap-4 justify-between">
          <Button size="sm" color="green" type="submit">
            {lang === 'fr' ? 'Filtrer' : 'تصفية '}
          </Button>
          <Button size="sm" color="gray" onClick={resetFilters}>
            {lang === 'fr' ? 'Réinitialiser' : 'إعادة تعيين '}
          </Button>
        </div>
      </form>
    </MenuList>
  );
};
