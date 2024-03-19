import {
  createContext,
  useEffect,
  useState,
  useMemo,
  type ReactNode,
} from 'react';

type ScreenSizes = {
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  is2Xl: boolean;
  isHuge: boolean;
};

type ScreenSizeContextProviderProps = {
  children: ReactNode;
};

export const ScreenSizeContext = createContext<ScreenSizes | undefined>(
  undefined,
);

export const ScreenSizeContextProvider = ({
  children,
}: ScreenSizeContextProviderProps): JSX.Element => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  const handleWindowSizeChange = (): void => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const value = useMemo(() => {
    // Tailwind CSS breakpoints
    const isSm = width < 640;
    const isMd = width >= 640 && width < 768;
    const isLg = width >= 768 && width < 1024;
    const isXl = width >= 1024 && width < 1280;
    const is2Xl = width >= 1280 && width < 1536;
    const isHuge = width >= 1536;

    return { isSm, isMd, isLg, isXl, is2Xl, isHuge };
  }, [width]);

  return (
    <ScreenSizeContext.Provider value={value}>
      {children}
    </ScreenSizeContext.Provider>
  );
};
