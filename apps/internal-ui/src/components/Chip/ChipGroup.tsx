import { Children, isValidElement, PropsWithChildren } from 'react';

import { ChipGroupProps } from './types';

const ChipGroup = ({
  ref,
  className,
  children,
  ariaLabel,
}: PropsWithChildren<ChipGroupProps>) => {
  return (
    <ul aria-label={ariaLabel ?? undefined} className={className} ref={ref}>
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return <li key={child.key}>{child}</li>;
        }

        return null;
      })}
    </ul>
  );
};

export default ChipGroup;
