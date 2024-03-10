import { ComponentPropsWithoutRef, type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type BoxProps = {
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<'div'>;

export function Box({ children, className = '', ...otherProps }: BoxProps) {
  return (
    <div
      className={twMerge(
        'mx-auto my-0 flex max-w-[80rem] flex-col gap-8',
        className,
      )}
      {...otherProps}
    >
      {children}
    </div>
  );
}
