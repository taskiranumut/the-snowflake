import {
  createContext,
  useContext,
  type ReactElement,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import { twMerge } from 'tailwind-merge';

type ColumnsType =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12';

type TableProps = {
  columns: ColumnsType;
  children: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

type CommonRowProps = {
  className?: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

type HeaderProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

type RowProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

type CellProps = {
  className?: string;
  children?: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

type BodyProps<T> = {
  data: T[] | undefined;
  render: (value: T) => ReactElement;
} & ComponentPropsWithoutRef<'div'>;

type FooterProps = {
  className?: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

type EmptyProps = {
  className?: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

type TableContextType = {
  columns: ColumnsType;
};

const TableContext = createContext<TableContextType | null>(null);

function useTableContext() {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error('TableContext does not exist!');
  }

  return context;
}

export function GridTable({
  columns,
  children,
  className = '',
  ...otherProps
}: TableProps) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div
        className={twMerge(
          'overflow-hidden rounded-md border bg-white text-base shadow-sm',
          className,
        )}
        role="table"
        {...otherProps}
      >
        {children}
      </div>
    </TableContext.Provider>
  );
}

function CommonRow({
  children,
  className = '',
  ...otherProps
}: CommonRowProps) {
  const { columns } = useTableContext();

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
    7: 'grid-cols-7',
    8: 'grid-cols-8',
    9: 'grid-cols-9',
    10: 'grid-cols-10',
    11: 'grid-cols-11',
    12: 'grid-cols-12',
  };

  return (
    <div
      className={twMerge(
        `grid gap-4 px-3 py-4 text-center transition-none ${gridCols[columns]}`,
        className,
      )}
      role="row"
      {...otherProps}
    >
      {children}
    </div>
  );
}

function Header({ children, className = '', ...otherProps }: HeaderProps) {
  return (
    <CommonRow
      className={twMerge(
        'border-b border-gray-100 bg-gray-50 px-4 py-3 font-semibold tracking-tight text-gray-600 last-of-type:border-0',
        className,
      )}
      {...otherProps}
    >
      {children}
    </CommonRow>
  );
}

function Row({ children, className = '', ...otherProps }: RowProps) {
  return (
    <CommonRow
      className={twMerge(
        'border-b border-gray-100 px-4 py-3 last-of-type:border-b-0',
        className,
      )}
      {...otherProps}
    >
      {children}
    </CommonRow>
  );
}

function Cell({ children, className = '', ...otherProps }: CellProps) {
  return (
    <div
      className={twMerge('flex items-center justify-start', className)}
      {...otherProps}
    >
      {children}
    </div>
  );
}

function Body<T>({
  data,
  render,
  className = '',
  ...otherProps
}: BodyProps<T>) {
  if (!data || !data.length)
    return <Empty>No data to show at the moment</Empty>;

  return (
    <div className={twMerge('m-0', className)} {...otherProps}>
      {data.map(render)}
    </div>
  );
}

function Footer({ children, className = '', ...otherProps }: FooterProps) {
  return (
    <div
      className={twMerge('flex justify-center bg-gray-50 px-4 py-3', className)}
      {...otherProps}
    >
      {children}
    </div>
  );
}

function Empty({ children, className = '', ...otherProps }: EmptyProps) {
  return (
    <div
      className={twMerge('m-4 text-center text-base font-normal', className)}
      {...otherProps}
    >
      {children}
    </div>
  );
}

GridTable.Header = Header;
GridTable.Body = Body;
GridTable.Row = Row;
GridTable.Cell = Cell;
GridTable.Footer = Footer;
GridTable.Empty = Empty;
