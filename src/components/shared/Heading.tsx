import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type HeadingProps = {
  children: ReactNode;
  as: 'h1' | 'h2' | 'h3';
} & (
  | ComponentPropsWithoutRef<'h1'>
  | ComponentPropsWithoutRef<'h2'>
  | ComponentPropsWithoutRef<'h3'>
);

function Heading({
  as,
  children,
  className = '',
  ...otherProps
}: HeadingProps) {
  const headingMap = {
    h1: (
      <h1
        className={twMerge('text-3xl font-semibold leading-6', className)}
        {...otherProps}
      >
        {children}
      </h1>
    ),
    h2: (
      <h2
        className={twMerge('text-xl font-semibold leading-6', className)}
        {...otherProps}
      >
        {children}
      </h2>
    ),
    h3: (
      <h3 className={twMerge('text-xl leading-6', className)} {...otherProps}>
        {children}
      </h3>
    ),
  };

  return headingMap[as];
}

export default Heading;
