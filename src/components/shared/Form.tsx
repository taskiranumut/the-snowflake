import { ComponentPropsWithoutRef, type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type FormProps = {
  children: ReactNode;
  modal?: boolean | undefined;
  className?: string;
} & ComponentPropsWithoutRef<'form'>;

export function Form({ children, modal, className = '', ...props }: FormProps) {
  const baseStyle = 'overflow-hidden text-base';
  const modalFormStyle = `${baseStyle} w-[54rem] p-4`;
  const formStyle = `${baseStyle} px-3 py-2 bg-white border rounded-md`;

  return (
    <form
      className={twMerge(modal ? modalFormStyle : formStyle, className)}
      {...props}
    >
      {children}
    </form>
  );
}
