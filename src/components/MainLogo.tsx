import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { useTranslation } from 'react-i18next';

type MainLogoProps = {
  redirect?: boolean;
  mini?: boolean;
};

export function MainLogo({ redirect = false, mini = false }: MainLogoProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-start gap-1">
      <img
        className={twMerge(
          'w-auto',
          redirect ? 'cursor-pointer' : '',
          mini ? 'h-10' : 'h-24',
        )}
        src="/main-logo.png"
        alt={t('title.app')}
        title={t('title.app')}
        onClick={() => redirect && navigate('/dashboard')}
      />
      {!mini && (
        <h1
          className={twMerge(
            'text-gray-600 dark:text-gray-300',
            mini ? 'text-xs' : 'text-xl',
          )}
        >
          {t('title.app')}
        </h1>
      )}
    </div>
  );
}
