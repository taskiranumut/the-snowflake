import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { useLogout } from '@/features/auth/hooks';
import { ButtonIcon, Spinner } from '@/components/shared';

export function Logout() {
  const { mutateLogout, isLoading } = useLogout();

  function handleLogout() {
    mutateLogout();
  }

  return (
    <ButtonIcon onClick={handleLogout} disabled={isLoading}>
      {isLoading ? (
        <Spinner mini />
      ) : (
        <HiArrowRightOnRectangle size="1.5rem" className="text-emerald-600" />
      )}
    </ButtonIcon>
  );
}
