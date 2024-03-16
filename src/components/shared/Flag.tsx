import { type ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

type FlagProps = {
  className?: string;
} & ComponentPropsWithoutRef<'img'>;

export function Flag({ className = '', ...otherProps }: FlagProps) {
  return (
    <img
      className={twMerge(
        'block max-w-6 rounded-sm border border-gray-100 dark:border-gray-800',
        className,
      )}
      {...otherProps}
    />
  );
}
