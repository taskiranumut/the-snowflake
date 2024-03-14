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
        'flex flex-col gap-6 rounded-lg border border-gray-100 bg-white p-8',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
