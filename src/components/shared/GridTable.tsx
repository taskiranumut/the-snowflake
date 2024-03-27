import {
  createContext,
  useContext,
  type ReactElement,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import { twMerge } from 'tailwind-merge';
import { useTranslation } from 'react-i18next';

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
  | '12'
  | 'equal'
  | 'auto';

type TableProps = {
  children: ReactNode;
  columns?: ColumnsType;
  template?: string;
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
  template: string;
};

const TableContext = createContext<TableContextType | null>(null);

function useTableContext() {
  const { t } = useTranslation();
  const context = useContext(TableContext);

  if (!context) {
    throw new Error(
      t('message.context.common.error', { context: 'TableContext' }),
    );
  }

  return context;
}

export function GridTable({
  children,
  columns = 'auto',
  template = '',
  className = '',
  ...otherProps
}: TableProps) {
  return (
    <TableContext.Provider value={{ columns, template }}>
      <div
        className={twMerge(
          'w-full overflow-x-auto overflow-y-hidden rounded-md border border-gray-100 bg-white text-base shadow-sm dark:border-gray-800 dark:bg-dark',
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
  const { columns, template } = useTableContext();

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
    equal: 'auto-cols-fr grid-flow-col',
    auto: 'auto-cols-auto grid-flow-col',
  };

  return (
    <div
      className={twMerge(
        'grid gap-4 px-3 py-4 text-center transition-none lg:w-auto',
        gridCols[columns],
        className,
      )}
      style={{ gridTemplateColumns: template }}
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
        'border-b border-gray-100 bg-gray-50 px-4 py-3 font-semibold tracking-tight text-gray-600 last-of-type:border-0 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300',
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
        'border-b border-gray-100 px-4 py-3 last-of-type:border-b-0 dark:border-gray-800',
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
  const { t } = useTranslation();
  if (!data || !data.length)
    return <Empty>{t('message.empty.gridTable.content')}</Empty>;

  return (
    <div className={twMerge('m-0', className)} {...otherProps}>
      {data.map(render)}
    </div>
  );
}

function Footer({ children, className = '', ...otherProps }: FooterProps) {
  return (
    <div
      className={twMerge(
        'sticky left-0 flex justify-center bg-gray-50 px-4 py-3 dark:bg-gray-900',
        className,
      )}
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
