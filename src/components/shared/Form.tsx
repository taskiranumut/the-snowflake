import { ComponentPropsWithoutRef, type ReactNode } from 'react';

type FormProps = {
  children: ReactNode;
  modal?: boolean | undefined;
} & ComponentPropsWithoutRef<'form'>;

export function Form({ children, modal, ...props }: FormProps) {
  const baseStyle = 'overflow-hidden text-base';
  const modalFormStyle = `${baseStyle} w-[54rem] p-4`;
  const formStyle = `${baseStyle} px-3 py-2 bg-white border rounded-md`;

  return (
    <form className={modal ? modalFormStyle : formStyle} {...props}>
      {children}
    </form>
  );
}
