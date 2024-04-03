import { twMerge } from 'tailwind-merge';

type SpinnerProps = {
  mini?: boolean;
  className?: string;
};

export function Spinner({ mini = false, className = '' }: SpinnerProps) {
  return mini ? (
    <div
      className={twMerge(
        'size-6 animate-spin rounded-full border-2 border-gray-200 border-t-emerald-600 dark:border-gray-600 dark:border-t-emerald-600',
        className,
      )}
    />
  ) : (
    <div
      className={twMerge(
        'mx-auto my-40 size-24 animate-spin rounded-full border-8 border-gray-200 border-t-emerald-600 dark:border-gray-600 dark:border-t-emerald-600',
        className,
      )}
    />
  );
}
