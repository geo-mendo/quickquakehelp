export const getStatusColor = (status: string) => {
  return status === 'waiting'
    ? 'gray'
    : status === 'pending'
    ? 'orange'
    : status === 'validated'
    ? 'green'
    : 'gray';
};

export const getStatusText = (status: string, lang: 'fr' | 'ar') => {
  return status === 'waiting'
    ? lang === 'fr'
      ? 'En attente'
      : 'في انتظار'
    : status === 'pending'
    ? lang === 'fr'
      ? 'En cours'
      : 'قيد الانجاز'
    : status === 'validated'
    ? lang === 'fr'
      ? 'Traitée'
      : 'معالجة'
    : '';
};
