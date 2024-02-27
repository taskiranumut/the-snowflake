import {
  createContext,
  useContext,
  type ReactElement,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';

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

function GridTable({
  columns,
  children,
  className = '',
  ...otherProps
}: TableProps) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div
        className={`border-1 overflow-hidden rounded-md bg-white text-base ${className}`}
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

  return (
    <div
      className={`grid gap-4 px-3 py-4 text-center transition-none grid-cols-${columns} ${className}`}
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
      className={`border-b border-gray-100 bg-gray-50 px-4 py-3 font-semibold tracking-tight text-gray-600 last-of-type:border-0 ${className}`}
      {...otherProps}
    >
      {children}
    </CommonRow>
  );
}

function Row({ children, className = '', ...otherProps }: RowProps) {
  return (
    <CommonRow
      className={`border-b border-gray-100 px-4 py-2 last-of-type:border-b-0 ${className}`}
      {...otherProps}
    >
      {children}
    </CommonRow>
  );
}

function Cell({ children, className = '', ...otherProps }: CellProps) {
  return (
    <div
      className={`flex items-center justify-start ${className}`}
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
    <div className={`m-0 ${className}`} {...otherProps}>
      {data.map(render)}
    </div>
  );
}

function Footer({ children, className = '', ...otherProps }: FooterProps) {
  return (
    <div
      className={`flex justify-center bg-gray-50 p-2 ${className}`}
      {...otherProps}
    >
      {children}
    </div>
  );
}

function Empty({ children, className = '', ...otherProps }: EmptyProps) {
  return (
    <div
      className={`m-4 text-center text-base font-normal ${className}`}
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

export default GridTable;
