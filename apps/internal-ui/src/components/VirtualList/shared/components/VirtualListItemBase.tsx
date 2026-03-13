import clsx from 'clsx';
import { ElementType, PropsWithChildren } from 'react';

import { VirtualListItemBaseProps } from '@/components/VirtualList/shared/types';

const VirtualListItemBase = <T extends ElementType = 'div'>({
  ref,
  as,
  style = {},
  topPosition,
  className,
  children,
}: PropsWithChildren<VirtualListItemBaseProps<T>>) => {
  const Component: ElementType = as ?? 'div';

  return (
    <Component
      className={clsx(
        'absolute top-0 right-0 left-0 will-change-transform',
        className,
      )}
      style={{
        ...style,
        transform: `translateY(${topPosition}px)`,
      }}
      ref={ref}
    >
      {children}
    </Component>
  );
};

export default VirtualListItemBase;
