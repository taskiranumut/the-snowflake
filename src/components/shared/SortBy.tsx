import { useSearchParams } from 'react-router-dom';
import { Select } from '@/components/shared';

type SortOptions = {
  value: string;
  label: string;
};

type SortByProps = {
  options: SortOptions[];
  queryField?: string;
};

export function SortBy({ options, queryField = 'sort-by' }: SortByProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryValue = searchParams.get(queryField) || '';

  function handleChange(data: string) {
    searchParams.set(queryField, data);
    setSearchParams(searchParams);
  }

  return (
    <Select
      className="px-4 py-3"
      options={options}
      value={queryValue}
      onChange={handleChange}
      secondary
    />
  );
}
