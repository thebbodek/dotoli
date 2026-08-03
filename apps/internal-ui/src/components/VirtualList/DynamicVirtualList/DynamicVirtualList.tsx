import { ElementType, useCallback, useRef, useState } from 'react';

import { DynamicVirtualListContextProvider } from '@/components/VirtualList/DynamicVirtualList/context';
import DynamicVirtualListItem from '@/components/VirtualList/DynamicVirtualList/DynamicVirtualListItem';
import { useVirtualItemsMetricsInitEffect } from '@/components/VirtualList/DynamicVirtualList/hooks';
import useVirtualListUpdateOffsetsCancelAnimationFrameEffect from '@/components/VirtualList/DynamicVirtualList/hooks/effects/useVirtualListUpdateOffsetsCancelAnimationFrameEffect';
import {
  DynamicVirtualListProps,
  VirtualListItemHeights,
  VirtualListItemOffsets,
} from '@/components/VirtualList/DynamicVirtualList/types';
import {
  findDynamicVirtualListIndexes,
  getEstimatedOffsets,
} from '@/components/VirtualList/DynamicVirtualList/utils';
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
  const rafIdRef = useRef(0);
  const heightsRef = useRef<VirtualListItemHeights>([]);
  const [measuredOffsets, setMeasuredOffsets] =
    useState<VirtualListItemOffsets>([]);
  const {
    models: { containerRef, scrollTop, containerHeight },
    operations: { onScroll },
  } = useVirtualList();

  const hasMeasuredOffsets = measuredOffsets.length === itemsTotalCount + 1;
  const offsets = hasMeasuredOffsets
    ? measuredOffsets
    : getEstimatedOffsets({
        offsets: measuredOffsets,
        itemsTotalCount,
        initialItemHeight,
        gap,
      });
  const totalItemsHeight = offsets[itemsTotalCount] - gap;
  const { startIndex, endIndex } = findDynamicVirtualListIndexes({
    containerHeight,
    scrollTop,
    offsets,
    itemsTotalCount,
    overScanCount,
  });

  const updateOffsets = useCallback(() => {
    cancelAnimationFrame(rafIdRef.current);

    rafIdRef.current = requestAnimationFrame(() => {
      const estimatedItemHeight = initialItemHeight + gap;
      const newOffsets = [0];

      for (let i = 0; i < itemsTotalCount; i++) {
        newOffsets[i + 1] =
          newOffsets[i] + (heightsRef.current[i] ?? estimatedItemHeight);
      }

      setMeasuredOffsets(newOffsets);
    });
  }, [itemsTotalCount, initialItemHeight, gap]);

  useVirtualItemsMetricsInitEffect({
    heightsRef,
    initialItemHeight,
    gap,
    itemsTotalCount,
    updateOffsets,
  });
  useVirtualListUpdateOffsetsCancelAnimationFrameEffect({ rafIdRef });

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
    </VirtualListRootWrapper>
  );
};

DynamicVirtualList.displayName = 'DynamicVirtualList';
DynamicVirtualList.Item = DynamicVirtualListItem;

export default DynamicVirtualList;
