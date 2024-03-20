import {
  createContext,
  useEffect,
  useState,
  useMemo,
  type ReactNode,
} from 'react';

type ScreenSizes = {
  /**
   * Indicates if the screen size is small (width < 640).
   */
  isSm: boolean;
  /**
   * Indicates if the screen size is medium (width >= 640 && width < 768).
   */
  isMd: boolean;
  /**
   * Indicates if the screen size is large (width >= 768 && width < 1024).
   */
  isLg: boolean;
  /**
   * Indicates if the screen size is extra large (width >= 1024 && width < 1280).
   */
  isXl: boolean;
  /**
   * Indicates if the screen size is 2 extra large (width >= 1280 && width < 1536).
   */
  is2Xl: boolean;
  /**
   * Indicates if the screen size is mobile (width < 768).
   */
  isMobile: boolean;
  /**
   * Indicates if the screen size is tablet (width >= 768 && width < 1280).
   */
  isTablet: boolean;
  /**
   * Indicates if the screen size is desktop (width >= 1280).
   */
  isDesktop: boolean;
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

    return {
      isSm: width < 640,
      isMd: width >= 640 && width < 768,
      isLg: width >= 768 && width < 1024,
      isXl: width >= 1024 && width < 1280,
      is2Xl: width >= 1280 && width < 1536,
      isMobile: width < 768,
      isTablet: width >= 768 && width < 1280,
      isDesktop: width >= 1280,
    };
  }, [width]);

  return (
    <ScreenSizeContext.Provider value={value}>
      {children}
    </ScreenSizeContext.Provider>
  );
};
