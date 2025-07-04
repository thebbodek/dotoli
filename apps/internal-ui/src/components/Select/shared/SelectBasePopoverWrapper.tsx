import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { SelectBasePopoverWrapperProps } from '@/components/Select/shared/types';

const SelectBasePopoverWrapper = ({
  children,
  className,
}: PropsWithChildren<SelectBasePopoverWrapperProps>) => {
  return (
    <div
      className={clsx(
        className,
        'animate-in-fade-in-select rounded-in-8 shadow-in-8 bg-in-white overflow-hidden',
      )}
    >
      {children}
    </div>
  );
};

export default SelectBasePopoverWrapper;
