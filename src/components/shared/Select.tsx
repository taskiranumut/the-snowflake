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

export function Select({
  options,
  value,
  white = false,
  ...otherProps
}: SelectProps) {
  const selectBaseStyle =
    'rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark px-3 py-3 text-base shadow-sm focus:border-0 focus:outline-none focus:ring-2 focus:ring-emerald-300 disabled:pointer-events-none disabled:opacity-50';
  const selectStyle = twMerge(
    selectBaseStyle,
    white ? 'border-gray-100 dark:border-gray-800' : '',
  );

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
