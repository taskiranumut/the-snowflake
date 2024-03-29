import { useOutsideClick } from '@/hooks';
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type MouseEvent,
  type ComponentPropsWithoutRef,
} from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';
import { twMerge } from 'tailwind-merge';
import { useTranslation } from 'react-i18next';

type Position = {
  x: number;
  y: number;
};

type MenuId = string | number;

type MenusProps = {
  children: ReactNode;
};

type MenuProps = {
  className?: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

type ToggleProps = {
  menuId: MenuId;
  className?: string;
  children?: ReactNode;
} & ComponentPropsWithoutRef<'button'>;

type ListProps = {
  menuId: MenuId;
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<'ul'>;

type ButtonProps = {
  onClick?: () => void;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<'button'>;

type MenusContextTypes = {
  openId: MenuId;
  handleClose: () => void;
  handleOpen: (menuId: MenuId) => void;
  position: Position | null;
  handleSetPosition: (position: Position) => void;
};

const MenusContext = createContext<MenusContextTypes | null>(null);

function useMenusContext() {
  const { t } = useTranslation();
  const context = useContext(MenusContext);

  if (!context) {
    throw new Error(
      t('message.context.common.error', { context: 'MenusContext' }),
    );
  }

  return context;
}

export function Menus({ children }: MenusProps) {
  const [openId, setOpenId] = useState<MenuId>('');
  const [position, setPosition] = useState<Position | null>(null);

  function handleClose() {
    setOpenId('');
  }

  function handleOpen(menuId: MenuId) {
    setOpenId(menuId);
  }

  function handleSetPosition(position: Position) {
    setPosition(position);
  }

  return (
    <MenusContext.Provider
      value={{ openId, handleClose, handleOpen, position, handleSetPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Menu({ children, className = '', ...otherProps }: MenuProps) {
  return (
    <div
      className={twMerge('flex items-center justify-end', className)}
      {...otherProps}
    >
      {children}
    </div>
  );
}

function Toggle({
  menuId,
  children,
  className = '',
  ...otherProps
}: ToggleProps) {
  const { openId, handleClose, handleOpen, handleSetPosition } =
    useMenusContext();

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();

    const rect = e.currentTarget?.getBoundingClientRect();
    const offset = 8;
    const menuHeight = 144 + offset;

    let yPosition = Math.round(rect.bottom + offset);
    const isOverflowing = yPosition + menuHeight > window.innerHeight;

    if (isOverflowing) {
      yPosition = Math.round(rect.top - menuHeight);
    }

    const position = {
      x: Math.round(window.innerWidth - rect.right),
      y: yPosition,
    };

    handleSetPosition(position);
    openId === '' || openId !== menuId ? handleOpen(menuId) : handleClose();
  }

  return (
    <button
      type="button"
      className={twMerge(
        'translate-x-2 rounded-md p-2 hover:bg-gray-100 hover:transition-colors hover:duration-200 dark:hover:bg-gray-800',
        className,
      )}
      onClick={handleClick}
      {...otherProps}
    >
      {children || (
        <HiEllipsisVertical className="text-xl text-gray-700 dark:text-gray-200" />
      )}
    </button>
  );
}

function List({ menuId, children, className = '', ...otherProps }: ListProps) {
  const { openId, position, handleClose } = useMenusContext();
  const ref = useOutsideClick<HTMLUListElement>(handleClose, false);

  if (openId !== menuId) return null;

  return createPortal(
    <ul
      style={{ top: position?.y, right: position?.x }}
      className={twMerge(
        'fixed rounded-md bg-white shadow-md dark:bg-gray-800',
        className,
      )}
      ref={ref}
      {...otherProps}
    >
      {children}
    </ul>,
    document.body,
  );
}

function Button({
  children,
  icon,
  onClick,
  className = '',
  ...otherProps
}: ButtonProps) {
  const { handleClose } = useMenusContext();

  function handleClick() {
    onClick?.();
    handleClose();
  }

  return (
    <li>
      <button
        type="button"
        className={twMerge(
          'flex w-full items-center gap-4 rounded-md px-6 py-3 text-left text-base hover:bg-gray-50 hover:transition-colors hover:duration-200 dark:hover:bg-gray-900',
          className,
        )}
        onClick={handleClick}
        {...otherProps}
      >
        {' '}
        {icon && (
          <span className="text-gray-400 dark:text-gray-500">{icon}</span>
        )}
        <span>{children}</span>
      </button>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
