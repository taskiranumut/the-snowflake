import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '@/utils/constants';

type PaginationProps = {
  count: number | null;
  pageSize?: number;
};

type PaginationButtonProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<'button'>;

function PaginationButton({ children, ...otherProps }: PaginationButtonProps) {
  return (
    <button
      type="button"
      className="flex items-center justify-center gap-1 rounded-md border-0 bg-gray-50 px-2 py-1.5 text-base text-inherit hover:bg-emerald-600 hover:text-emerald-50 hover:transition-colors hover:duration-200 active:bg-emerald-900 disabled:opacity-50 disabled:hover:bg-gray-50 disabled:hover:text-inherit dark:bg-gray-900 dark:disabled:hover:bg-gray-900"
      {...otherProps}
    >
      {children}
    </button>
  );
}

export function Pagination({ count, pageSize = PAGE_SIZE }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  if (!count || count <= pageSize) return null;

  const pageParams = searchParams.get('page');
  const currentPage = pageParams ? Number(pageParams) : 1;

  const pageCount = Math.ceil(count / pageSize);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set('page', next.toString());
    setSearchParams(searchParams);
  }

  function previousPage() {
    const previous = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set('page', previous.toString());
    setSearchParams(searchParams);
  }

  return (
    <div className="flex w-full items-center justify-between">
      <p className="text-base">
        Showing{' '}
        <span className="font-semibold">
          {(currentPage - 1) * pageSize + 1}
        </span>{' '}
        to{' '}
        <span className="font-semibold">
          {currentPage === pageCount ? count : currentPage * pageSize}
        </span>{' '}
        of <span className="font-semibold">{count}</span> results
      </p>
      <div className="flex gap-2">
        <PaginationButton onClick={previousPage} disabled={currentPage === 1}>
          <AiOutlineLeft size="1.25rem" />
        </PaginationButton>
        <PaginationButton
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          <AiOutlineRight size="1.25rem" />
        </PaginationButton>
      </div>
    </div>
  );
}
