import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps = {
  children?: ReactNode;
  content?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'danger';
  className?: string;
} & ComponentPropsWithoutRef<'button'>;

export function Button({
  content,
  children,
  size = 'md',
  color = 'primary',
  className = '',
  ...props
}: ButtonProps) {
  const base =
    'rounded-md shadow-sm text-center transition-colors duration-200 font-normal disabled:opacity-50 disabled:pointer-events-none focus:border-0 focus:outline-none focus:ring-2 focus:ring-emerald-300';

  const sizes = {
    sm: 'text-sm py-1 px-2',
    md: 'text-base py-2 px-3',
    lg: 'text-lg py-3 px-4',
  };

  const colors = {
    primary: 'text-emerald-50 bg-emerald-600 hover:bg-emerald-700',
    secondary:
      'text-gray-600 dark:text-gray-300 bg-white dark:bg-dark hover:bg-gray-50 dark:hover:bg-gray-900 border border-gray-200 dark:border-gray-700',
    danger: 'text-red-100 bg-red-700 hover:bg-red-800',
  };

  const styles = twMerge(base, sizes[size], colors[color], className);

  return (
    <button type="button" className={styles} {...props}>
      {content || children}
    </button>
  );
}
