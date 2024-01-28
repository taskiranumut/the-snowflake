import { forwardRef, type ComponentPropsWithoutRef } from 'react';

type InputProps = {
  label?: string;
  id?: string | number;
  className?: string;
  wrapper?: boolean;
} & ComponentPropsWithoutRef<'input'>;

const FormInput = forwardRef<HTMLInputElement, InputProps>(function Input(
  { id, label, className = '', wrapper = false, ...props },
  ref,
) {
  const styles =
    props?.type === 'file'
      ? 'file-px-3 rounded-md border text-base shadow-sm file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-sky-600 file:py-2 file:text-inherit file:text-sky-50 file:transition-colors file:duration-200 file:hover:bg-sky-700'
      : 'rounded-md border border-gray-300 bg-white px-3 py-2 text-base shadow-sm';

  const elements = (
    <>
      <label htmlFor={id} className="text-base font-normal">
        {label}
      </label>
      <input
        id={id}
        type="text"
        className={`${styles} ${className}`}
        {...props}
        ref={ref}
      />
    </>
  );

  return wrapper ? <div>{elements}</div> : elements;
});

export default FormInput;
