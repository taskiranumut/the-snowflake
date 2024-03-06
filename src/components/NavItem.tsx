import { NavLink } from 'react-router-dom';
import { type ReactNode } from 'react';

type NavItemProps = {
  to: string;
  children?: ReactNode;
  title?: string;
  icon?: ReactNode;
};

export function NavItem({ to, icon, title, children }: NavItemProps) {
  const baseLink =
    'flex items-center gap-2 px-4 py-3 text-base font-normal transition-all duration-200 hover:rounded-md hover:bg-gray-50 hover:text-gray-800';
  const activeLink = baseLink + ' rounded-md bg-gray-50 text-gray-800';
  const passiveLink = baseLink + ' text-gray-600';

  const baseIcon = 'text-xl transition-all duration-100';
  const activeIcon = baseIcon + ' text-sky-600';
  const passiveIcon = baseIcon + ' text-gray-300';

  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? activeLink : passiveLink)}
      children={({ isActive }) => (
        <>
          {icon && (
            <span className={isActive ? activeIcon : passiveIcon}>{icon}</span>
          )}
          {title && <span>{title}</span>}
          {children}
        </>
      )}
    />
  );
}
