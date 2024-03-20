import { useContext } from 'react';
import { ScreenSizeContext } from '@/context/ScreenSizeContext';

export function useScreenSizeContext() {
  const context = useContext(ScreenSizeContext);

  if (context === undefined) {
    throw new Error(
      'ScreenSizeContext was used outside of ScreenSizeContextProvider',
    );
  }

  return context;
}
