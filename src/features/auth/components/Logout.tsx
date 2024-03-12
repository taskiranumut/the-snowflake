import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { useLogout } from '@/features/auth/hooks';
import { Spinner } from '@/components/shared';

export function Logout() {
  const { mutateLogout, isLoading } = useLogout();

  function handleLogout() {
    mutateLogout();
  }

  return (
    <button
      type="button"
      className="rounded-md p-2 transition-all duration-200 hover:bg-gray-100"
      onClick={handleLogout}
      disabled={isLoading}
    >
      {isLoading ? (
        <Spinner mini />
      ) : (
        <HiArrowRightOnRectangle size="1.5rem" className="text-emerald-600" />
      )}
    </button>
  );
}
