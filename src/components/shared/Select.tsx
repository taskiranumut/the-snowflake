import { Listbox } from '@headlessui/react';
import { Fragment } from 'react';
import { twMerge } from 'tailwind-merge';
import { HiChevronDown } from 'react-icons/hi2';

type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  options: SelectOption[];
  value: string;
  onChange: (data: string) => void;
  secondary?: boolean;
  /** Only regular classname or tailwind classes are valid for width. */
  width?: string;
  /** Only regular classname or tailwind classes are valid for height.*/
  height?: string;
  /** Styling affects the select 'button' element. */
  className?: string;
};

export function Select({
  options,
  value,
  secondary = false,
  onChange,
  width = 'w-full',
  height = 'h-auto',
  className = '',
}: SelectProps) {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className={twMerge('relative', width, height)}>
        <Listbox.Button
          className={twMerge(
            'font-base relative h-full w-full truncate rounded-md border border-gray-300 bg-white p-3 text-base leading-5 shadow-sm hover:bg-gray-100/40 hover:transition-colors hover:duration-200 active:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-600 dark:bg-dark dark:hover:bg-gray-800 dark:active:bg-gray-900',
            secondary ? 'border-gray-100 dark:border-gray-800' : '',
            className,
            'pr-8',
          )}
        >
          {options.find((item) => item.value === value)?.label ??
            options?.at(0)?.label}
          <span className="absolute right-0 top-1/2 inline-block -translate-y-1/2 transform pr-3">
            <HiChevronDown />
          </span>
        </Listbox.Button>
        <Listbox.Options className="absolute z-50 mt-3 max-h-[220px] w-full overflow-y-auto rounded-md text-base shadow-md dark:shadow-lg">
          {options.map((option) => (
            <Listbox.Option
              key={option.value}
              value={option.value}
              as={Fragment}
            >
              {({ selected }) => (
                <li
                  className={twMerge(
                    'w-full border-b border-gray-100 bg-white p-3 leading-5 text-gray-900 text-inherit first-of-type:rounded-t-md last-of-type:rounded-b-md last-of-type:border-b-0 hover:cursor-pointer hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-900',
                    selected ? 'bg-gray-50 dark:bg-dark' : '',
                  )}
                >
                  {option.label}
                </li>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}
