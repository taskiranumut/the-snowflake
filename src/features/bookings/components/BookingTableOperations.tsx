import { Filter, SortBy } from '@/components/shared';
import { useTranslation } from 'react-i18next';

export function BookingTableOperations() {
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4 lg:w-auto">
      <Filter
        queryField="status"
        options={[
          { value: 'all', label: t('label.bookings.filter.all') },
          {
            value: 'checked-out',
            label: t('label.bookings.filter.checkedOut'),
          },
          { value: 'checked-in', label: t('label.bookings.filter.checkedIn') },
          {
            value: 'unconfirmed',
            label: t('label.bookings.filter.unconfirmed'),
          },
        ]}
      />
      <SortBy
        options={[
          {
            value: 'start_date-desc',
            label: t('label.bookings.sort.startDateDesc'),
          },
          {
            value: 'start_date-asc',
            label: t('label.bookings.sort.startDateAsc'),
          },
          {
            value: 'total_price-desc',
            label: t('label.bookings.sort.totalPriceDesc'),
          },
          {
            value: 'total_price-asc',
            label: t('label.bookings.sort.totalPriceAsc'),
          },
        ]}
      />
    </div>
  );
}
