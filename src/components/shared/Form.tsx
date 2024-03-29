import { ComponentPropsWithoutRef, type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type FormProps = {
  children: ReactNode;
  modal?: boolean | undefined;
  className?: string;
} & ComponentPropsWithoutRef<'form'>;

export function Form({ children, modal, className = '', ...props }: FormProps) {
  const modalFormStyle = 'w-[82vw] sm:w-[70vw] md:w-[60vw] lg:w-[54rem] p-2';
  const formStyle =
    'bg-white dark:bg-dark border border-gray-100 dark:border-gray-800 rounded-md';

  return (
    <form
      className={twMerge(
        'overflow-hidden p-3 text-base sm:p-4',
        modal ? modalFormStyle : formStyle,
        className,
      )}
      {...props}
    >
      {children}
    </form>
  );
}
