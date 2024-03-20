import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type RowProps = {
  children: ReactNode;
  type?: 'vertical' | 'horizontal';
  responsive?: boolean;
} & ComponentPropsWithoutRef<'div'>;

export function Row({
  type = 'vertical',
  className = '',
  children = '',
  responsive = false,
  ...otherProps
}: RowProps) {
  const typeStyleMap = {
    vertical: 'flex flex-col gap-4',
    horizontal: `${responsive ? 'flex flex-col sm:flex-row gap-4 sm:gap-0 items-start sm:items-center justify-center sm:justify-between' : 'flex items-center justify-between'}`,
  };

  return (
    <div className={twMerge(typeStyleMap[type], className)} {...otherProps}>
      {children}
    </div>
  );
}
