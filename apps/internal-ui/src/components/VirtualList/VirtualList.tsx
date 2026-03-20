import { mergeRefs } from '@bbodek/utils';
import clsx from 'clsx';
import { ElementType, useCallback, useRef, useState } from 'react';

import useCalculateContainerHeightEffect from '@/components/VirtualList/hooks/effects/useCalculateContainerHeightEffect';
import {
  GetTopPositionParams,
  VirtualListProps,
} from '@/components/VirtualList/types';
import VirtualListItem from '@/components/VirtualList/VirtualListItem';

const VirtualList = <T extends ElementType, P extends ElementType>({
  ref,
  itemHeight,
  gap = 0,
  itemsTotalCount,
  rootElement: RootElement,
  listElement: ListElement,
  className,
  listClassName,
  children,
}: VirtualListProps<T, P>) => {
  const RootComponent: ElementType = RootElement ?? 'div';
  const ListComponent: ElementType = ListElement ?? 'div';
  const containerRef = useRef<HTMLElement | null>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const _itemHeight = itemHeight + gap;
  const visibleCount = Math.ceil(containerHeight / _itemHeight);
  const totalItemsHeight = _itemHeight * itemsTotalCount;
  const startIndex = Math.floor(scrollTop / _itemHeight);
  const endIndex = Math.min(itemsTotalCount - 1, startIndex + visibleCount);

  const handleScroll = () => {
    const refCurrent = containerRef.current;

    if (refCurrent && 'scrollTop' in refCurrent) {
      setScrollTop(refCurrent.scrollTop);
    }
  };

  const getTopPosition = useCallback(
    ({ index }: GetTopPositionParams) =>
      `${(startIndex + index) * _itemHeight}px`,
    [startIndex, _itemHeight],
  );

  useCalculateContainerHeightEffect({
    containerRef,
    setContainerHeight,
  });

  return (
    <RootComponent
      className={clsx(className, 'overflow-y-auto')}
      ref={ref ? mergeRefs(containerRef, ref) : containerRef}
      onScroll={handleScroll}
    >
      <ListComponent
        className={clsx(listClassName && listClassName, 'relative!')}
        style={{ height: `${totalItemsHeight}px` }}
      >
        {children({
          startIndex,
          endIndex: endIndex + 1,
          getTopPosition,
        })}
      </ListComponent>
    </RootComponent>
  );
};

VirtualList.displayName = 'VirtualList';
VirtualList.Item = VirtualListItem;

export default VirtualList;
