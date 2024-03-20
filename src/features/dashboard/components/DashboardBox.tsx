import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type DashboardBoxProps = {
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<'div'>;

export function DashboardBox({
  children,
  className,
  ...props
}: DashboardBoxProps) {
  return (
    <div
      className={twMerge(
        'flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-4 md:gap-6 md:p-8 dark:border-gray-800 dark:bg-dark',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
