import { type ReactNode } from 'react';

type MainProps = {
  children: ReactNode;
};

function Main({ children }: MainProps) {
  return (
    <main className="h-full overflow-auto bg-gray-50 px-3 py-4">
      {children}
    </main>
  );
}

export default Main;
