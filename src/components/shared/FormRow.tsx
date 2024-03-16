import { ComponentPropsWithoutRef, type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type FormRowProps = {
  children: ReactNode;
  error?: string;
  type?: 'vertical' | 'horizontal';
  className?: string;
} & ComponentPropsWithoutRef<'div'>;

export function FormRow({
  error,
  children,
  type = 'horizontal',
  className = '',
  ...otherProps
}: FormRowProps) {
  return (
    <div
      className={twMerge(
        'grid grid-cols-[16rem_1.2fr_1fr] items-center gap-6 border-b border-b-gray-100 px-0 py-3 first:pt-0 last:border-0 last:pb-0 has-[button]:flex has-[button]:justify-end has-[button]:gap-3 dark:border-b-gray-800',
        type === 'vertical' ? 'grid-cols-1 gap-3 border-0 pb-4 pt-2' : '',
        className,
      )}
      {...otherProps}
    >
      {children}
      {error && <div className="text-base text-red-700">{error}</div>}
    </div>
  );
}
