import { NavLink } from 'react-router-dom';
import { type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type NavItemProps = {
  to: string;
  children?: ReactNode;
  title?: string;
  icon?: ReactNode;
};

export function NavItem({ to, icon, title, children }: NavItemProps) {
  const activeLink = 'rounded-md bg-gray-100 dark:bg-gray-900';
  const passiveLink = 'text-gray-600 dark:text-gray-300';

  const activeIcon = 'text-emerald-600';
  const passiveIcon = 'text-gray-400 dark:text-gray-500';

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        twMerge(
          'flex items-center gap-2 px-4 py-3 text-base font-normal hover:rounded-md hover:bg-gray-100 hover:text-gray-800 hover:transition-colors hover:duration-200 dark:hover:bg-gray-900 dark:hover:text-gray-100',
          isActive ? activeLink : passiveLink,
        ) as string
      }
      children={({ isActive }) => (
        <>
          {icon && (
            <span
              className={twMerge(
                'text-xl',
                isActive ? activeIcon : passiveIcon,
              )}
            >
              {icon}
            </span>
          )}
          {title && <span>{title}</span>}
          {children}
        </>
      )}
    />
  );
}
