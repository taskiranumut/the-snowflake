import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

type FilterOption = {
  value: string;
  label: string;
};

type FilterProps = {
  options: FilterOption[];
  queryField: string;
};

type FilterButtonProps = {
  active: boolean;
  children: ReactNode;
} & ComponentPropsWithoutRef<'button'>;

function FilterButton({ active, children, ...otherProps }: FilterButtonProps) {
  const filterButtonBaseStyle =
    'rounded-md border-0 bg-white px-2.5 py-1.5 transition-all duration-200 hover:text-sky-50 hover:bg-sky-600 disabled:pointer-events-none disabled:hover:bg-white disabled:hover:text-inherit';
  const filterButtonActiveStyle = 'text-sky-50 bg-sky-600';
  const filterButtonStyle = twMerge(
    filterButtonBaseStyle,
    active ? filterButtonActiveStyle : '',
  );

  return (
    <button type="button" className={filterButtonStyle} {...otherProps}>
      {children}
    </button>
  );
}

function Filter({ queryField, options }: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedOption = searchParams.get(queryField) || options.at(0)?.value;

  function handleChangeTab(option: string) {
    searchParams.set(queryField, option);
    setSearchParams(searchParams);
  }

  return (
    <div className="border-1 flex gap-2 rounded-md bg-white p-2 shadow-sm">
      {options.map(({ value, label }) => (
        <FilterButton
          key={value}
          onClick={() => handleChangeTab(value)}
          active={selectedOption === value}
        >
          {label}
        </FilterButton>
      ))}
    </div>
  );
}

export default Filter;
