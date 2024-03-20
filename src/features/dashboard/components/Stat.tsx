import { useScreenSizeContext } from '@/context';
import { cloneElement, type ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';

type StatProps = {
  title: string;
  value: number | string;
  color: 'blue' | 'green' | 'yellow' | 'pink';
  icon: ReactElement;
};

export function Stat({ title, value, color, icon }: StatProps) {
  const { isMobile } = useScreenSizeContext();
  const colors = {
    blue: { bg: 'bg-sky-100', text: 'text-sky-700' },
    green: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
    pink: { bg: 'bg-pink-100', text: 'text-pink-700' },
  };

  return (
    <div className="grid w-full grid-cols-[4rem_1fr] grid-rows-[auto_auto] gap-x-2 gap-y-1 rounded-lg border border-gray-100 bg-white p-4 md:gap-x-4 dark:border-gray-800 dark:bg-dark">
      <div
        className={twMerge(
          'row-span-full flex aspect-square size-12 items-center justify-center rounded-full md:size-auto',
          colors[color].bg,
        )}
      >
        {cloneElement(icon, {
          size: isMobile ? '1.75rem' : '2rem',
          className: colors[color].text,
        })}
      </div>
      <h5 className="self-end text-sm font-semibold text-gray-500 dark:text-gray-300">
        {title}
      </h5>
      <p className="text-lg font-normal leading-6 md:text-2xl">{value}</p>
    </div>
  );
}
