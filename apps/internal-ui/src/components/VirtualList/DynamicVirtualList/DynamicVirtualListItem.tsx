import { ElementType, memo, PropsWithChildren, useRef } from 'react';

import { useDynamicVirtualListContext } from '@/components/VirtualList/DynamicVirtualList/context';
import { useVirtualListItemResizeObserverEffect } from '@/components/VirtualList/DynamicVirtualList/hooks';
import { DynamicVirtualListItemProps } from '@/components/VirtualList/DynamicVirtualList/types';
import { VirtualListItemBase } from '@/components/VirtualList/shared';

const DynamicVirtualListItem = <T extends ElementType = 'div'>({
  as,
  index,
  className,
  children,
}: PropsWithChildren<DynamicVirtualListItemProps<T>>) => {
  const ref = useRef<HTMLElement>(null);
  const { offsets, initialItemHeight, startIndex } =
    useDynamicVirtualListContext();

  const dataIndex = startIndex + index;
  const topPosition = offsets[dataIndex] ?? 0;

  useVirtualListItemResizeObserverEffect({ ref, dataIndex });

  return (
    <VirtualListItemBase
      style={{
        minHeight: `${initialItemHeight}px`,
      }}
      as={as}
      className={className}
      ref={ref}
      topPosition={topPosition}
    >
      {children}
    </VirtualListItemBase>
  );
};

export default memo(DynamicVirtualListItem);
