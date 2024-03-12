import { Logout } from '@/features/auth/components';
import { ButtonIcon } from '@/components/shared';
import { useNavigate } from 'react-router-dom';
import { HiOutlineUser } from 'react-icons/hi2';

export function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <ul className="flex gap-1">
      <li>
        <ButtonIcon onClick={() => navigate('/account')}>
          <HiOutlineUser size="1.5rem" className="text-emerald-600" />
        </ButtonIcon>
      </li>
      <li>
        <Logout />
      </li>
    </ul>
  );
}
