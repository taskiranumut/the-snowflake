import {
  useState,
  createContext,
  type ReactNode,
  useMemo,
  useEffect,
} from 'react';
import { useIsMobileDevice } from '@/hooks';

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
  const isMobileDevice = useIsMobileDevice();
  const [isOpen, setIsOpen] = useState(!isMobileDevice);

  useEffect(() => {
    setIsOpen(!isMobileDevice);
  }, [isMobileDevice]);

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
