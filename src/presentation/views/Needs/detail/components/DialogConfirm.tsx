import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from '@material-tailwind/react';
import { useAtomValue } from 'jotai';
import { langAtom } from '../../../../../states/atoms';

interface DialogConfirmProps {
  open: boolean;
  handleOpen: () => void;
  updateStatus: () => void;
}

export const DialogConfirm = ({
  open,
  handleOpen,
  updateStatus,
}: DialogConfirmProps) => {
  const lang = useAtomValue(langAtom);
  const handleConfirm = () => {
    updateStatus();
    handleOpen();
  };
  return (
    <div>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader className={`${lang === 'ar' && 'justify-end'}`}>
          {lang === 'fr'
            ? "La demande d'aide a été traitée ?"
            : 'هل تم معالجة طلب المساعدة؟'}
        </DialogHeader>
        <DialogBody className={`${lang === 'ar' && 'text-right'}`} divider>
          {lang === 'fr'
            ? "Êtes vous sur de vouloir confirmer que la demande d'aide a été traitée et que ce village est maintenant gérer par les autorités compétentes ?"
            : 'هل أنت متأكد من أنك تريد تأكيد أن طلب المساعدة تم معالجته وأن هذا القرية الآن تحت إدارة السلطات المختصة؟'}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>{lang === 'fr' ? 'Annuler' : 'إلغاء'}</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleConfirm}>
            <span>{lang === 'fr' ? 'Confirmer' : 'تأكيد'}</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};
