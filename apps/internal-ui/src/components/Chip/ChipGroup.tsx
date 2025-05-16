'use client';

import { Children, isValidElement, PropsWithChildren } from 'react';

import { ChipGroupProps } from './types';

const ChipGroup = ({
  className,
  children,
}: PropsWithChildren<ChipGroupProps>) => {
  return (
    <ul className={className}>
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
