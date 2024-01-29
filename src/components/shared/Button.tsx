import { type ComponentPropsWithoutRef, type ReactNode } from 'react';

type ButtonProps = {
  children?: ReactNode;
  content?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'danger';
  className?: string;
} & ComponentPropsWithoutRef<'button'>;

function Button({
  content,
  children,
  size = 'md',
  color = 'primary',
  className = '',
  ...props
}: ButtonProps) {
  const base =
    'rounded-md shadow-sm text-center transition-all duration-200 font-normal disabled:opacity-50 disabled:pointer-events-none focus:border-0 focus:outline-none focus:ring-2 focus:ring-sky-300';

  const sizes = {
    sm: 'text-sm py-1 px-2',
    md: 'text-base py-2 px-3',
    lg: 'text-lg py-3 px-4',
  };

  const colors = {
    primary: 'text-sky-50 bg-sky-600 hover:bg-sky-700',
    secondary: 'text-gray-600 bg-white hover:bg-gray-50 border border-gray-200',
    danger: 'text-red-100 bg-red-700 hover:bg-red-800',
  };

  const styles = `${base} ${sizes[size]} ${colors[color]} ${className}`;

  return (
    <button type="button" className={styles} {...props}>
      {content || children}
    </button>
  );
}

export default Button;
