import { Filter, SortBy } from '@/components/shared';
import { useTranslation } from 'react-i18next';

export function ContainerTableOperations() {
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4 lg:w-auto">
      <Filter
        queryField="discount"
        options={[
          { value: 'all', label: t('label.containers.filter.all') },
          {
            value: 'no-discount',
            label: t('label.containers.filter.noDiscount'),
          },
          {
            value: 'with-discount',
            label: t('label.containers.filter.withDiscount'),
          },
        ]}
      />
      <SortBy
        options={[
          { value: 'name-asc', label: t('label.containers.sort.nameAsc') },
          { value: 'name-desc', label: t('label.containers.sort.nameDesc') },
          {
            value: 'regularPrice-asc',
            label: t('label.containers.sort.regularPriceAsc'),
          },
          {
            value: 'regularPrice-desc',
            label: t('label.containers.sort.regularPriceDesc'),
          },
          {
            value: 'maxCapacity-asc',
            label: t('label.containers.sort.maxCapacityAsc'),
          },
          {
            value: 'maxCapacity-desc',
            label: t('label.containers.sort.maxCapacityDesc'),
          },
        ]}
      />
    </div>
  );
}
