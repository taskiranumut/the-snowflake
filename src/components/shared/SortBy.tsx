import { type ChangeEvent } from 'react';
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

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    searchParams.set(queryField, value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      onChange={handleChange}
      value={queryValue}
      white
    />
  );
}
