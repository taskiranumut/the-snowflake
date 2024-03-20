import { useState, createContext, type ReactNode, useMemo } from 'react';
import { useScreenSizeContext } from '.';

type ToggleSidebarContextType = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
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
  const { isSm } = useScreenSizeContext();
  const [isOpen, setIsOpen] = useState(!isSm);

  function onOpen() {
    setIsOpen(true);
  }

  function onClose() {
    setIsOpen(false);
  }

  function onToggle() {
    setIsOpen((is) => !is);
  }

  const value = useMemo(() => {
    return {
      isOpen,
      onOpen,
      onClose,
      onToggle,
    };
  }, [isOpen]);

  return (
    <ToggleSidebarContext.Provider value={value}>
      {children}
    </ToggleSidebarContext.Provider>
  );
}
