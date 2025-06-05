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
        'animate-fade-in-select rounded-8 shadow-8 overflow-hidden bg-white',
      )}
    >
      {children}
    </div>
  );
};

export default SelectBasePopoverWrapper;
