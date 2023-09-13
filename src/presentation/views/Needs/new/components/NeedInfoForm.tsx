import {
  Input,
  List,
  ListItem,
  Button,
  IconButton,
  ListItemSuffix,
} from '@material-tailwind/react';
import { HelperText } from './HelperText';
import { NeedInfoModel } from '../../../../../data/models/NeedModelForm';
import { IFormProps } from '../IFormProps';
import React from 'react';
import { useAtomValue } from 'jotai';
import { langAtom } from '../../../../../states/atoms';

function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
    >
      <path
        fillRule="evenodd"
        d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
        clipRule="evenodd"
      />
    </svg>
  );
}

interface NeedInfoFormProps extends IFormProps {
  formData: NeedInfoModel;
  handleNeedsChange: any;
}
export const NeedInfoForm = ({
  formData,
  handleNeedsChange,
}: NeedInfoFormProps) => {
  const lang = useAtomValue(langAtom);

  const saveCurrentNeed = (e: React.SyntheticEvent<HTMLInputElement>) => {
    handleNeedsChange(e.currentTarget.value, 'save');
  };

  const addNewNeed = () => {
    handleNeedsChange('', 'add');
  };

  const removeNeed = (need: string) => {
    handleNeedsChange(need, 'remove');
  };

  const getValue = () => {
    if (formData.allNeeds.length === 0) return '';
    return formData.allNeeds[formData.allNeeds.length - 1];
  };

  const getNeedNumber = () => {
    if (formData.allNeeds.length === 0) return 1;
    return formData.allNeeds.length;
  };
  return (
    <div className="flex flex-col gap-6">
      <div>
        <List>
          {formData.allNeeds.map((need: string, index: number) => (
            <ListItem ripple={false} key={index} className="py-0">
              - {need}
              <ListItemSuffix>
                <IconButton
                  variant="text"
                  color="blue-gray"
                  onClick={() => removeNeed(need)}
                >
                  <TrashIcon />
                </IconButton>
              </ListItemSuffix>
            </ListItem>
          ))}
        </List>
        <div>
          <Input
            crossOrigin=""
            size="lg"
            name="allNeeds"
            label={
              lang === 'fr'
                ? `Besoin n°${getNeedNumber()}`
                : `${getNeedNumber()} الاحتياج رقم`
            }
            onChange={saveCurrentNeed}
            value={getValue()}
          />
          <Button
            type="button"
            size="sm"
            color="teal"
            className="my-2"
            onClick={addNewNeed}
          >
            {' '}
            {lang === 'fr' ? 'Ajouter le besoin' : 'إضافة الاحتياج'}
          </Button>
        </div>
        <HelperText>
          {lang === 'fr'
            ? 'Lister de manière simple les besoins principaux (ex: eau, nourriture,couverture, etc...)'
            : 'استفصل ببساطة الاحتياجات الرئيسية (مثل: ماء، طعام، بطانية، إلخ...)'}
        </HelperText>
      </div>
    </div>
  );
};
