import { type ReactNode } from 'react';

type HeadingProps = {
  children: ReactNode;
  as: 'h1' | 'h2' | 'h3';
};

function Heading({ as, children }: HeadingProps) {
  const headingMap = {
    h1: <h1 className="text-3xl font-semibold leading-6">{children}</h1>,
    h2: <h2 className="text-xl font-semibold leading-6">{children}</h2>,
    h3: <h3 className="text-xl leading-6">{children}</h3>,
  };

  return headingMap[as];
}

export default Heading;
