import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { PreviewWrapperProps } from '@/components/Preview/shared/components/Preview/types';

const PreviewWrapper = ({
  className,
  children,
  'aria-expanded': ariaExpanded,
}: PropsWithChildren<PreviewWrapperProps>) => {
  return (
    <div
      aria-expanded={ariaExpanded}
      className={clsx(className, 'bg-in-gray-09 h-full w-full overflow-hidden')}
    >
      {children}
    </div>
  );
};

export default PreviewWrapper;
