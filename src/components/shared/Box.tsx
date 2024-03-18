import { useToggleSidebarContext } from '@/context';
import { ComponentPropsWithoutRef, type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type BoxProps = {
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<'div'>;

export function Box({ children, className = '', ...otherProps }: BoxProps) {
  const { isOpen } = useToggleSidebarContext();
  return (
    <div
      className={twMerge(
        'mx-auto my-0 flex flex-col gap-8',
        isOpen ? 'max-w-[80rem]' : 'w-full',
        className,
      )}
      {...otherProps}
    >
      {children}
    </div>
  );
}
