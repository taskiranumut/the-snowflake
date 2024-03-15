import { Heading, Button } from '@/components/shared';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai';

type ErrorFallbackProps = {
  title?: string;
  message?: string;
};

export function ErrorFallback({
  title = 'Oops! Something went wrong.',
  message = 'We are sorry, but something went wrong. Please try again.',
}: ErrorFallbackProps) {
  const navigate = useNavigate();

  return (
    <main className="flex h-screen items-center justify-center bg-gray-50 p-10">
      <div className="shrink grow-0 basis-[64rem] rounded-lg border border-gray-100 bg-white px-10 py-16 text-center">
        <Heading as="h1" className="mb-4">
          {title}
        </Heading>
        <p className="mb-8 font-sono text-gray-500">{message}</p>
        <div className="flex justify-center gap-4">
          <Button size="lg" onClick={() => window.location.reload()}>
            Try Again
          </Button>
          <Button
            size="lg"
            color="secondary"
            className="flex items-center justify-center gap-3"
            onClick={() => navigate('/dashboard')}
          >
            Go to Dashboard
            <AiOutlineArrowRight size="1.5rem" />
          </Button>
        </div>
      </div>
    </main>
  );
}
