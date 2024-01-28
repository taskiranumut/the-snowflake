import { type ReactNode } from 'react';

type FormProps = {
  children: ReactNode;
  modal?: boolean | undefined;
};

function Form({ children, modal }: FormProps) {
  const baseStyle = 'overflow-hidden text-base';
  const modalFormStyle = `${baseStyle} w-[54rem]`;
  const formStyle = `${baseStyle} px-3 py-2 bg-white border rounded-md`;

  return <form className={modal ? modalFormStyle : formStyle}>{children}</form>;
}

export default Form;
