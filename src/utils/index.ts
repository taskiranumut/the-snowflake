import {
  formatDistance,
  parseISO,
  endOfDay,
  formatISO,
  startOfDay,
} from 'date-fns';

export const formatCurrency = (value: number | null) => {
  if (value === null) return '';

  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

export const formatDistanceFromNow = (dateStr: string | null) => {
  if (dateStr === null) return '';

  return formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace('about ', '')
    .replace('in', 'In');
};

export const getToday = function (options: { end?: boolean } = {}) {
  const today = new Date();

  if (options?.end) {
    return formatISO(endOfDay(today));
  } else {
    return formatISO(startOfDay(today));
  }
};
