import { Heading, Button } from '@/components/shared';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

type ErrorFallbackProps = {
  title?: string;
  message?: string;
};

export function ErrorFallback({ title, message }: ErrorFallbackProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <main className="flex h-screen items-center justify-center bg-gray-50 p-10 dark:bg-gray-900">
      <div className="shrink grow-0 basis-[64rem] rounded-lg border border-gray-100 bg-white px-10 py-16 text-center dark:border-gray-800 dark:bg-dark">
        <Heading as="h1" className="mb-4">
          {title || t('message.fallback.title')}
        </Heading>
        <p className="mb-8 font-sono text-gray-500 dark:text-gray-400">
          {message || t('message.fallback.content')}
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" onClick={() => window.location.reload()}>
            {t('action.fallback.tryAgaing')}
          </Button>
          <Button
            size="lg"
            color="secondary"
            className="flex items-center justify-center gap-3"
            onClick={() => navigate('/dashboard')}
          >
            {t('action.fallback.goToHome')}
            <AiOutlineArrowRight size="1.5rem" />
          </Button>
        </div>
      </div>
    </main>
  );
}
