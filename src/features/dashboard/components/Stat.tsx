import { cloneElement, type ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';

type StatProps = {
  title: string;
  value: number | string;
  color: 'blue' | 'green' | 'yellow' | 'pink';
  icon: ReactElement;
};

export function Stat({ title, value, color, icon }: StatProps) {
  const colors = {
    blue: { bg: 'bg-sky-100', text: 'text-sky-700' },
    green: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
    pink: { bg: 'bg-pink-100', text: 'text-pink-700' },
  };

  return (
    <div className="dark:bg-dark grid grid-cols-[4rem_1fr] grid-rows-[auto_auto] gap-x-4 gap-y-1 rounded-md border border-gray-100 bg-white p-4 dark:border-gray-800">
      <div
        className={twMerge(
          'row-span-full flex aspect-square items-center justify-center rounded-full',
          colors[color].bg,
        )}
      >
        {cloneElement(icon, { size: '2rem', className: colors[color].text })}
      </div>
      <h5 className="self-end text-sm font-semibold text-gray-500 dark:text-gray-300">
        {title}
      </h5>
      <p className="text-2xl font-normal leading-6">{value}</p>
    </div>
  );
}