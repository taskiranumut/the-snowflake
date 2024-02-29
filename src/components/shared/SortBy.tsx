import { type ChangeEvent } from 'react';
import Select from './Select';
import { useSearchParams } from 'react-router-dom';

type SortOptions = {
  value: string;
  label: string;
};

type SortByProps = {
  options: SortOptions[];
  queryField?: string;
};

function SortBy({ options, queryField = 'sort-by' }: SortByProps) {
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

export default SortBy;
