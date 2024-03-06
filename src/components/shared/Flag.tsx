import { type ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

type FlagProps = {
  className?: string;
} & ComponentPropsWithoutRef<'img'>;

export function Flag({ className = '', ...otherProps }: FlagProps) {
  return (
    <img
      className={twMerge(
        'border-1 block max-w-6 rounded-sm border-gray-100',
        className,
      )}
      {...otherProps}
    />
  );
}
