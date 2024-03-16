type SpinnerProps = {
  mini?: boolean;
};

export function Spinner({ mini = false }: SpinnerProps) {
  return mini ? (
    <div className="size-6 animate-spin rounded-full border-2 border-gray-200 border-t-emerald-600 dark:border-gray-600 dark:border-t-emerald-600" />
  ) : (
    <div className="mx-auto my-40 size-24 animate-spin rounded-full border-8 border-gray-200 border-t-emerald-600 dark:border-gray-600 dark:border-t-emerald-600" />
  );
}
