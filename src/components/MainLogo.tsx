import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { APP_TITLE } from '@/utils/constants';

type MainLogoProps = {
  redirect?: boolean;
  mini?: boolean;
};

export function MainLogo({ redirect = false, mini = false }: MainLogoProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-start gap-1">
      <img
        className={twMerge(
          'w-auto',
          redirect ? 'cursor-pointer' : '',
          mini ? 'h-10' : 'h-24',
        )}
        src="/main-logo.png"
        alt={APP_TITLE}
        title={APP_TITLE}
        onClick={() => redirect && navigate('/dashboard')}
      />
      {!mini && (
        <h1
          className={twMerge(
            'text-gray-600 dark:text-gray-300',
            mini ? 'text-xs' : 'text-xl',
          )}
        >
          {APP_TITLE}
        </h1>
      )}
    </div>
  );
}
