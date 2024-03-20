import { cloneElement, type ReactElement, type ReactNode } from 'react';

type DataItemProps = {
  children: ReactNode;
  label: string;
  icon?: ReactElement;
};

export function DataItem({ children, label, icon }: DataItemProps) {
  return (
    <div className="flex flex-col items-start gap-2 px-0 py-2 md:flex-row md:items-center md:gap-4">
      <span className="flex items-center gap-2">
        {icon &&
          cloneElement(icon, {
            size: '1.25rem',
            className: 'text-emerald-600',
          })}
        <span className="text-gray-700 dark:text-gray-500">{label}</span>
      </span>
      {children}
    </div>
  );
}
