import { useState, createContext, type ReactNode } from 'react';

type ToggleSidebarContextType = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

type ToggleSidebarContextProviderProps = {
  children: ReactNode;
};

export const ToggleSidebarContext = createContext<
  ToggleSidebarContextType | undefined
>(undefined);

export function ToggleSidebarContextProvider({
  children,
}: ToggleSidebarContextProviderProps) {
  const [isOpen, setIsOpen] = useState(true);

  function toggleSidebar() {
    setIsOpen((is) => !is);
  }

  return (
    <ToggleSidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </ToggleSidebarContext.Provider>
  );
}
