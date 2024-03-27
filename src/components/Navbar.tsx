import { NavItem } from '@/components';
import { useTranslation } from 'react-i18next';
import {
  HiHome,
  HiCalendarDays,
  HiCube,
  HiMiniUserGroup,
  HiCog8Tooth,
} from 'react-icons/hi2';

export function Navbar() {
  const { t } = useTranslation();

  return (
    <nav>
      <ul className="flex flex-col gap-2">
        <li>
          <NavItem
            to="/dashboard"
            title={t('title.sidebar.home')}
            icon={<HiHome />}
          />
        </li>
        <li>
          <NavItem
            to="/bookings"
            title={t('title.sidebar.bookings')}
            icon={<HiCalendarDays />}
          />
        </li>
        <li>
          <NavItem
            to="/containers"
            title={t('title.sidebar.containers')}
            icon={<HiCube />}
          />
        </li>
        <li>
          <NavItem
            to="/users"
            title={t('title.sidebar.users')}
            icon={<HiMiniUserGroup />}
          />
        </li>
        <li>
          <NavItem
            to="/settings"
            title={t('title.sidebar.settings')}
            icon={<HiCog8Tooth />}
          />
        </li>
      </ul>
    </nav>
  );
}
