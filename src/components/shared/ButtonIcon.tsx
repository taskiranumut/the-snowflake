import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonIconProps = {
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<'button'>;

export function ButtonIcon({
  children,
  className = '',
  ...otherProps
}: ButtonIconProps) {
  return (
    <button
      type="button"
      className={twMerge(
        'rounded-md p-2 transition-all duration-200 hover:bg-gray-100',
        className,
      )}
      {...otherProps}
    >
      {children}
    </button>
  );
}
