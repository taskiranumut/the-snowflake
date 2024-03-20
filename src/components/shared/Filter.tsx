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
    'text-base rounded-md border-0 bg-white dark:bg-dark leading-5 px-1 sm:px-2 py-1 hover:text-emerald-50 hover:bg-emerald-600 disabled:pointer-events-none disabled:hover:bg-white dark:disabled:hover:bg-dark disabled:hover:text-inherit hover:transition-colors hover:duration-200';
  const filterButtonActiveStyle =
    'text-emerald-50 bg-emerald-600 dark:text-emerald-50 dark:bg-emerald-600';
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

export function Filter({ queryField, options }: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedOption = searchParams.get(queryField) || options.at(0)?.value;

  function handleChangeTab(option: string) {
    searchParams.set(queryField, option);

    if (searchParams.get('page')) {
      searchParams.set('page', '1');
    }

    setSearchParams(searchParams);
  }

  return (
    <div className="flex gap-2 rounded-md border border-gray-100 bg-white p-2 shadow-sm dark:border-gray-800 dark:bg-dark">
      {options.map(({ value, label }) => (
        <FilterButton
          key={value}
          onClick={() => handleChangeTab(value)}
          active={selectedOption === value}
          disabled={selectedOption === value}
        >
          {label}
        </FilterButton>
      ))}
    </div>
  );
}
