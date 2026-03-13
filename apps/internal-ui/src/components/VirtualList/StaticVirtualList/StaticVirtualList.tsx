import { ElementType, useCallback } from 'react';

import {
  useVirtualList,
  VirtualListRootWrapper,
  VirtualListWrapper,
} from '@/components/VirtualList/shared';
import StaticVirtualListItem from '@/components/VirtualList/StaticVirtualList/StaticVirtualListItem';
import {
  GetTopPositionParams,
  StaticVirtualListProps,
} from '@/components/VirtualList/StaticVirtualList/types';

const StaticVirtualList = <T extends ElementType, P extends ElementType>({
  ref,
  as,
  itemsTotalCount,
  itemHeight,
  gap = 0,
  listOptions,
  className,
  children,
}: StaticVirtualListProps<T, P>) => {
  const {
    models: { containerRef, scrollTop, containerHeight },
    operations: { onScroll },
  } = useVirtualList();

  const _itemHeight = itemHeight + gap;
  const visibleCount = Math.ceil(containerHeight / _itemHeight);
  const totalItemsHeight = _itemHeight * itemsTotalCount - gap;
  const startIndex = Math.floor(scrollTop / _itemHeight);
  const endIndex = Math.min(itemsTotalCount - 1, startIndex + visibleCount);

  const getTopPosition = useCallback(
    ({ index }: GetTopPositionParams) => (startIndex + index) * _itemHeight,
    [startIndex, _itemHeight],
  );

  return (
    <VirtualListRootWrapper
      as={as}
      className={className}
      containerRef={containerRef}
      ref={ref}
      onScroll={onScroll}
    >
      <VirtualListWrapper
        {...(listOptions ?? {})}
        totalItemsHeight={totalItemsHeight}
      >
        {children({
          startIndex,
          endIndex: endIndex + 1,
          getTopPosition,
        })}
      </VirtualListWrapper>
    </VirtualListRootWrapper>
  );
};

StaticVirtualList.displayName = 'StaticVirtualList';
StaticVirtualList.Item = StaticVirtualListItem;

export default StaticVirtualList;
