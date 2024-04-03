import { Toaster } from 'react-hot-toast';
import { useThemeContext } from '@/context';

export function ToasterProvider() {
  const { theme } = useThemeContext();

  return (
    <Toaster
      position="top-center"
      gutter={12}
      containerClassName="m-2"
      toastOptions={{
        success: { duration: 3000 },
        error: { duration: 5000 },
        className: 'text-base max-w-[500px] px-4 py-3',
        style: {
          backgroundColor: theme === 'light' ? '#FFFFFF' : '#374151',
          color: theme === 'light' ? '#374151' : '#e5e7eb',
        },
      }}
    />
  );
}
