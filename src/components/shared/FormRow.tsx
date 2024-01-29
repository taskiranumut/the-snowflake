import { type ReactNode } from 'react';

type FormRowProps = {
  children: ReactNode;
  error?: string;
};

function FormRow({ error, children }: FormRowProps) {
  return (
    <div className="grid grid-cols-[16rem_1fr_1.2fr] items-center gap-6 border-b border-b-gray-100 px-0 py-3 first:pt-0 last:border-0 last:pb-0 has-[button]:flex has-[button]:justify-end has-[button]:gap-3">
      {children}
      {error && <div className="text-base text-red-700">{error}</div>}
    </div>
  );
}

export default FormRow;
