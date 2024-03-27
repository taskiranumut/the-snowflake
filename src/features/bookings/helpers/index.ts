import { t } from 'i18next';

export function getTagColorForBookingStatus(status: string | null | undefined) {
  switch (status) {
    case 'unconfirmed':
      return 'blue';
    case 'checked-in':
      return 'green';
    case 'checked-out':
      return 'gray';
    default:
      return '';
  }
}

export function getFormattedStatus(status: string | null | undefined) {
  switch (status) {
    case 'unconfirmed':
      return t('label.bookings.status.unconfirmed');
    case 'checked-in':
      return t('label.bookings.status.checkedIn');
    case 'checked-out':
      return t('label.bookings.status.checkedOut');
    default:
      return '';
  }
}
