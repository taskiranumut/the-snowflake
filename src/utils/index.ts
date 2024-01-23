export const formatCurrency = (value: number | null) => {
  if (value === null) return '';

  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};
