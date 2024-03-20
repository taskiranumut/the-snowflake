import { type ComponentPropsWithoutRef, type ReactNode } from 'react';

type CheckboxProps = {
  id: string | number;
  children?: ReactNode;
  label?: ReactNode;
  disabled?: boolean;
} & ComponentPropsWithoutRef<'input'>;

export function Checkbox({
  label,
  children,
  id,
  disabled,
  ...otherProps
}: CheckboxProps) {
  return (
    <div className="flex items-center gap-4">
      <input
        id={id}
        disabled={disabled}
        className="size-6 origin-center accent-emerald-600 transition-all duration-200 disabled:accent-emerald-600 disabled:opacity-50"
        {...otherProps}
        type="checkbox"
      />
      <label
        htmlFor={!disabled ? id : ''}
        className="flex flex-1 items-center gap-2"
      >
        {label || children || ''}
      </label>
    </div>
  );
}
