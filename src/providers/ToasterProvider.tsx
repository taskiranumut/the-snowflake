import { Toaster } from 'react-hot-toast';

function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      gutter={12}
      containerClassName="m-2"
      toastOptions={{
        success: { duration: 3000 },
        error: { duration: 5000 },
        className: 'text-base max-w-[500px] px-4 py-3 bg-white color-gray-700',
      }}
    />
  );
}

export default ToasterProvider;
