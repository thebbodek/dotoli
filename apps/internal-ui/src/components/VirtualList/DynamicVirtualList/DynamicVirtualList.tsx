import { ElementType, useCallback, useRef, useState } from 'react';

import { DynamicVirtualListContextProvider } from '@/components/VirtualList/DynamicVirtualList/context';
import DynamicVirtualListItem from '@/components/VirtualList/DynamicVirtualList/DynamicVirtualListItem';
import { useVirtualItemsMetricsInitEffect } from '@/components/VirtualList/DynamicVirtualList/hooks';
import {
  DynamicVirtualListProps,
  VirtualListItemOffsets,
} from '@/components/VirtualList/DynamicVirtualList/types';
import { findDynamicVirtualListIndexes } from '@/components/VirtualList/DynamicVirtualList/utils';
import {
  useVirtualList,
  VirtualListRootWrapper,
  VirtualListWrapper,
} from '@/components/VirtualList/shared';

const DynamicVirtualList = <T extends ElementType, P extends ElementType>({
  ref,
  as,
  itemsTotalCount,
  initialItemHeight,
  gap = 0,
  listOptions,
  overScanCount = 0,
  className,
  children,
}: DynamicVirtualListProps<T, P>) => {
  const heightsRef = useRef<number[]>([]);
  const [offsets, setOffsets] = useState<VirtualListItemOffsets>([]);
  const {
    models: { containerRef, scrollTop, containerHeight },
    operations: { onScroll },
  } = useVirtualList();

  const totalItemsHeight = offsets[itemsTotalCount] - gap;
  const { startIndex, endIndex } = findDynamicVirtualListIndexes({
    containerHeight,
    scrollTop,
    offsets,
    itemsTotalCount,
    overScanCount,
  });

  const updateOffsets = useCallback(() => {
    const newOffsets = [0];

    for (let i = 0; i < itemsTotalCount; i++) {
      newOffsets[i + 1] = newOffsets[i] + heightsRef.current[i];
    }

    setOffsets(newOffsets);
  }, [itemsTotalCount]);

  useVirtualItemsMetricsInitEffect({
    heightsRef,
    initialItemHeight,
    gap,
    itemsTotalCount,
    updateOffsets,
  });

  const renderer = () => {
    if (offsets.length < itemsTotalCount + 1) {
      return null;
    }

    return (
      <VirtualListWrapper
        {...(listOptions ?? {})}
        totalItemsHeight={totalItemsHeight}
      >
        <DynamicVirtualListContextProvider
          gap={gap}
          heightsRef={heightsRef}
          initialItemHeight={initialItemHeight}
          itemsTotalCount={itemsTotalCount}
          offsets={offsets}
          startIndex={startIndex}
          updateOffsets={updateOffsets}
        >
          {children({ startIndex, endIndex: endIndex + 1 })}
        </DynamicVirtualListContextProvider>
      </VirtualListWrapper>
    );
  };

  return (
    <VirtualListRootWrapper
      as={as}
      className={className}
      containerRef={containerRef}
      ref={ref}
      onScroll={onScroll}
    >
      {renderer()}
    </VirtualListRootWrapper>
  );
};

DynamicVirtualList.displayName = 'DynamicVirtualList';
DynamicVirtualList.Item = DynamicVirtualListItem;

export default DynamicVirtualList;
