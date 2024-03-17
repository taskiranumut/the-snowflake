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
    'flex items-center gap-2 px-4 py-3 text-base font-normal hover:rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-gray-800 dark:hover:text-gray-100 hover:transition-colors hover:duration-200';
  const activeLink = baseLink + ' rounded-md bg-gray-100 dark:bg-gray-900';
  const passiveLink = baseLink + ' text-gray-600 dark:text-gray-300';

  const baseIcon = 'text-xl';
  const activeIcon = baseIcon + ' text-emerald-600';
  const passiveIcon = baseIcon + ' text-gray-400 dark:text-gray-500';

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
