import { type ReactNode } from 'react';

type BoxProps = {
  children: ReactNode;
};

export function Box({ children }: BoxProps) {
  return (
    <div className="mx-auto my-0 flex max-w-[80rem] flex-col gap-8">
      {children}
    </div>
  );
}
