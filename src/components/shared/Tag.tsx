import { type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type TagProps = {
  children: ReactNode;
  color: string;
};

type ColorsType = {
  [key in string]: string;
};

export function Tag({ children, color }: TagProps) {
  const colors: ColorsType = {
    blue: 'text-sky-700 bg-sky-100 dark:text-sky-800 dark:bg-sky-300',
    green:
      'text-emerald-700 bg-emerald-100 dark:text-emerald-800 dark:bg-emerald-300',
    gray: 'text-gray-700 bg-gray-100 dark:bg-gray-400 dark:text-gray-800',
  };

  return (
    <span
      className={twMerge(
        'w-fit rounded-full px-3 py-1 text-sm font-semibold',
        color ? colors[color] || '' : '',
      )}
    >
      {children}
    </span>
  );
}
