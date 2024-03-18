import { useContext } from 'react';
import { ToggleSidebarContext } from '@/context/ToggleSidebarContext';

export function useToggleSidebarContext() {
  const context = useContext(ToggleSidebarContext);
  if (context === undefined) {
    throw new Error(
      'ToggleSidebarContext was used outside of ToggleSidebarContextProvider',
    );
  }
  return context;
}
