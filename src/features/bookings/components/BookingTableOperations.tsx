import { Filter, SortBy } from '@/components/shared';

export function BookingTableOperations() {
  return (
    <div className="flex items-center gap-4">
      <Filter
        queryField="status"
        options={[
          { value: 'all', label: 'All' },
          { value: 'checked-out', label: 'Checked out' },
          { value: 'checked-in', label: 'Checked in' },
          { value: 'unconfirmed', label: 'Unconfirmed' },
        ]}
      />
      <SortBy
        options={[
          { value: 'start_date-desc', label: 'Sort by date (recent first)' },
          { value: 'start_date-asc', label: 'Sort by date (earlier first)' },
          {
            value: 'total_price-desc',
            label: 'Sort by amount (high first)',
          },
          { value: 'total_price-asc', label: 'Sort by amount (low first)' },
        ]}
      />
    </div>
  );
}
