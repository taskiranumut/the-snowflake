import { type ReactNode } from 'react';

type MainProps = {
  children: ReactNode;
};

export function Main({ children }: MainProps) {
  return (
    <main className="h-full overflow-auto bg-gray-50 px-10 pb-10 pt-4 dark:bg-gray-900">
      {children}
    </main>
  );
}
