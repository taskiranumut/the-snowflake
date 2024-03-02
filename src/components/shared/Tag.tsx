import { type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type TagProps = {
  children: ReactNode;
  color: string;
};

type ColorsType = {
  [key in string]: string;
};

function Tag({ children, color }: TagProps) {
  const colors: ColorsType = {
    blue: 'text-blue-700 bg-blue-100',
    green: 'text-green-700 bg-green-100',
    gray: 'text-gray-700 bg-gray-100',
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

export default Tag;
