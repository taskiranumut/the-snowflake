import { forwardRef, type ComponentPropsWithoutRef } from 'react';

type TextAreaProps = {
  label?: string;
  id?: string | number;
  className?: string;
  wrapper?: boolean;
} & ComponentPropsWithoutRef<'textarea'>;

const FormTextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    { id, label, className = '', wrapper = false, ...props },
    ref,
  ) {
    const elements = (
      <>
        <label htmlFor={id} className="text-base font-normal">
          {label}
        </label>
        <textarea
          id={id}
          className={`h-24 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base shadow-sm ${className}`}
          {...props}
          ref={ref}
        />
      </>
    );

    return wrapper ? <div>{elements}</div> : elements;
  },
);

export default FormTextArea;