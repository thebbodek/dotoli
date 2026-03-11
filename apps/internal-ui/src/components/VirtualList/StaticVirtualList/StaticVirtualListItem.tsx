import { ElementType, memo, PropsWithChildren } from 'react';

import { VirtualListItemBase } from '@/components/VirtualList/shared';
import { StaticVirtualListItemProps } from '@/components/VirtualList/StaticVirtualList/types';

const StaticVirtualListItem = <T extends ElementType = 'div'>({
  as,
  height,
  topPosition,
  className,
  children,
}: PropsWithChildren<StaticVirtualListItemProps<T>>) => {
  return (
    <VirtualListItemBase
      as={as}
      className={className}
      style={{ height: `${height}px` }}
      topPosition={topPosition}
    >
      {children}
    </VirtualListItemBase>
  );
};
export default memo(StaticVirtualListItem);
