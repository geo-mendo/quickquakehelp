import { toast } from 'react-hot-toast';

const api = () => {
  return {
    success: (message: string) => {
      toast.success(message);
    },
    error: (message: string) => {
      toast.error(message);
    },
    info: (message: string) => {
      toast(message);
    },
    warn: (message: string) => {
      toast(message);
    },
    loading: (message: string) => {
      toast.loading(message);
    },
    remove: (id: string) => {
      toast.dismiss(id);
    },
  };
};

export const notifSercice = api();