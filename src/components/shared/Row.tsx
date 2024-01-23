import { ReactNode } from 'react';

type RowProps = {
  type?: 'vertical' | 'horizontal';
  children: ReactNode;
};

function Row({ type = 'vertical', children }: RowProps) {
  const typeStyleMap = {
    vertical: 'flex flex-col gap-4 my-4',
    horizontal: 'flex items-center justify-between my-4',
  };

  return <div className={typeStyleMap[type]}>{children}</div>;
}

export default Row;
