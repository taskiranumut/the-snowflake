import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

type InputProps = {
  label?: string;
  id?: string | number;
  className?: string;
  wrapper?: boolean;
} & ComponentPropsWithoutRef<'input'>;

export const FormInput = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    { id, label, className = '', wrapper = false, ...props },
    ref,
  ) {
    const styles =
      props?.type === 'file'
        ? 'file-px-3 rounded-md border border-gray-300 dark:border-gray-600 text-base shadow-sm file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-emerald-600 file:py-2 file:text-inherit file:text-emerald-50 file:transition-colors file:duration-200 file:hover:bg-emerald-700 disabled:opacity-50 disabled:pointer-events-none focus:border-0 focus:outline-none focus:ring-2 focus:ring-emerald-300'
        : 'rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark px-3 py-2 text-base shadow-sm disabled:opacity-50 disabled:pointer-events-none focus:border-0 focus:outline-none focus:ring-2 focus:ring-emerald-300';

    const elements = (
      <>
        <label htmlFor={id} className="text-base font-normal">
          {label}
        </label>
        <input
          id={id}
          type="text"
          className={twMerge(styles, className)}
          {...props}
          ref={ref}
        />
      </>
    );

    return wrapper ? <div>{elements}</div> : elements;
  },
);
