import { Toaster } from 'react-hot-toast';
import { useThemeContext } from '@/context';
import { twMerge } from 'tailwind-merge';

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
        className: twMerge(
          'text-base max-w-[500px] px-4 py-3',
          theme === 'light'
            ? 'bg-white text-gray-700'
            : 'bg-gray-700 text-gray-200',
        ),
      }}
    />
  );
}
