import { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  options: SelectOption[];
  value: string;
  white?: boolean;
} & ComponentPropsWithoutRef<'select'>;

function Select({ options, value, white = false, ...otherProps }: SelectProps) {
  const selectBaseStyle =
    'rounded-md border border-gray-300 bg-white px-3 py-3 text-base shadow-sm focus:border-0 focus:outline-none focus:ring-2 focus:ring-sky-300 disabled:pointer-events-none disabled:opacity-50';
  const selectStyle = twMerge(selectBaseStyle, white ? 'border-gray-100' : '');

  return (
    <select name="" id="" value={value} className={selectStyle} {...otherProps}>
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}

export default Select;
