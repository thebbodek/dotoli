import clsx from 'clsx';
import { ElementType, PropsWithChildren } from 'react';

import { VirtualListWrapperProps } from '@/components/VirtualList/shared/types';

const VirtualListWrapper = <T extends ElementType = 'div'>({
  as,
  totalItemsHeight,
  className,
  children,
  ...props
}: PropsWithChildren<VirtualListWrapperProps<T>>) => {
  const Component: ElementType = as ?? 'div';

  return (
    <Component
      {...props}
      className={clsx(className, 'relative')}
      style={{ height: `${totalItemsHeight}px` }}
    >
      {children}
    </Component>
  );
};

export default VirtualListWrapper;
