import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type RowProps = {
  type?: 'vertical' | 'horizontal';
  children: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

function Row({
  type = 'vertical',
  className = '',
  children = '',
  ...otherProps
}: RowProps) {
  const typeStyleMap = {
    vertical: 'flex flex-col gap-4',
    horizontal: 'flex items-center justify-between',
  };

  return (
    <div className={twMerge(typeStyleMap[type], className)} {...otherProps}>
      {children}
    </div>
  );
}

export default Row;
