import NavItem from '@/ui/shared/NavItem';
import {
  AiFillHome,
  AiFillCalendar,
  AiFillBuild,
  AiFillAliwangwang,
  AiFillSetting,
} from 'react-icons/ai';

function Navbar() {
  return (
    <nav>
      <ul className="flex flex-col gap-2">
        <li>
          <NavItem to="/dashboard" title="Home" icon={<AiFillHome />} />
        </li>
        <li>
          <NavItem to="/bookings" title="Bookings" icon={<AiFillCalendar />} />
        </li>
        <li>
          <NavItem to="/containers" title="Containers" icon={<AiFillBuild />} />
        </li>
        <li>
          <NavItem to="/users" title="Users" icon={<AiFillAliwangwang />} />
        </li>
        <li>
          <NavItem to="/settings" title="Settings" icon={<AiFillSetting />} />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
