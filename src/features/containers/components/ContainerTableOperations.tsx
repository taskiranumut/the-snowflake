import Filter from '@/components/shared/Filter';

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
    </div>
  );
}

export default ContainerTableOperations;
