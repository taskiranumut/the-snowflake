import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

type MainLogoProps = {
  redirect?: boolean;
};

export function MainLogo({ redirect = false }: MainLogoProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-start gap-1">
      <img
        className={twMerge('h-32 w-auto', redirect ? 'cursor-pointer' : '')}
        src="/hotel-logo.png"
        alt="The Snowflake Logo"
        onClick={() => redirect && navigate('/dashboard')}
      />
      <h1 className="text-xl text-gray-600">The Snowflake</h1>
    </div>
  );
}
