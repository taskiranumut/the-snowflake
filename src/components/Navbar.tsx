import { NavItem } from '@/components';
import {
  HiHome,
  HiCalendarDays,
  HiCube,
  HiMiniUserGroup,
  HiCog8Tooth,
} from 'react-icons/hi2';

export function Navbar() {
  return (
    <nav>
      <ul className="flex flex-col gap-2">
        <li>
          <NavItem to="/dashboard" title="Home" icon={<HiHome />} />
        </li>
        <li>
          <NavItem to="/bookings" title="Bookings" icon={<HiCalendarDays />} />
        </li>
        <li>
          <NavItem to="/containers" title="Containers" icon={<HiCube />} />
        </li>
        <li>
          <NavItem to="/users" title="Users" icon={<HiMiniUserGroup />} />
        </li>
        <li>
          <NavItem to="/settings" title="Settings" icon={<HiCog8Tooth />} />
        </li>
      </ul>
    </nav>
  );
}
