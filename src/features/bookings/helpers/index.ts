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
