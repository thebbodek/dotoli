import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { SelectBasePopoverWrapperProps } from '@/components/Select/shared/types';

const SelectBasePopoverWrapper = ({
  children,
  className,
  useMobile = false,
  ref,
  tabIndex,
  onKeyDown,
}: PropsWithChildren<SelectBasePopoverWrapperProps>) => {
  return (
    <div
      className={clsx(
        className,
        'animate-in-fade-in-select rounded-in-8 shadow-in-8 bg-in-white overflow-hidden focus:outline-none',
        useMobile &&
          'in-tablet:static in-tablet:inset-auto in-flex-v-stack in-tablet:block fixed inset-0',
      )}
      ref={ref}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
    >
      {children}
    </div>
  );
};

export default SelectBasePopoverWrapper;
