import { type ReactNode } from 'react';

type MainProps = {
  children: ReactNode;
};

export function Main({ children }: MainProps) {
  return (
    <main className="h-full overflow-auto bg-gray-50 p-4 pb-10 pt-6 sm:p-6 md:px-10 dark:bg-gray-900">
      {children}
    </main>
  );
}
