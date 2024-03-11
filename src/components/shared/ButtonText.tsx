import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonTextProps = {
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<'button'>;

export function ButtonText({
  children,
  className = '',
  ...otherProps
}: ButtonTextProps) {
  return (
    <button
      type="button"
      className={twMerge(
        'rounded-md border-0 text-center text-emerald-600 transition-all duration-200 hover:text-emerald-500 active:text-emerald-700',
        className,
      )}
      {...otherProps}
    >
      {children}
    </button>
  );
}
