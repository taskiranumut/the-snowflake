import Filter from '@/components/shared/Filter';
import SortBy from '@/components/shared/SortBy';

function ContainerTableOperations() {
  return (
    <div className="flex items-center gap-4">
      <Filter
        queryField="discount"
        options={[
          { value: 'all', label: 'All' },
          { value: 'no-discount', label: 'No Discount' },
          { value: 'with-discount', label: 'With Discount' },
        ]}
      />
      <SortBy
        options={[
          { value: 'name-asc', label: 'Sort by name (A-Z)' },
          { value: 'name-desc', label: 'Sort by name (Z-A)' },
          { value: 'regularPrice-asc', label: 'Sort by price (low first)' },
          { value: 'regularPrice-desc', label: 'Sort by price (high first)' },
          { value: 'maxCapacity-asc', label: 'Sort by capacity (low first)' },
          {
            value: 'maxCapacity-desc',
            label: 'Sort by capacity (high first)',
          },
        ]}
      />
    </div>
  );
}

export default ContainerTableOperations;
