import {
  FindEndIndexParams,
  FindIndexParams,
  FindStartIndexParams,
} from '@/components/VirtualList/DynamicVirtualList/utils/types';

export const findIndex = ({
  offset,
  itemsTotalCount,
  offsets,
}: FindIndexParams) => {
  if (offsets.length === 0) return 0;

  let low = 0;
  let high = itemsTotalCount - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    const start = offsets[mid];
    const end = offsets[mid + 1];

    if (offset >= start && offset < end) {
      return mid;
    }

    if (offset < start) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return null;
};

export const findStartIndex = ({
  scrollTop,
  overScanCount,
  ...rest
}: FindStartIndexParams) => {
  const foundIndex = findIndex({ offset: scrollTop, ...rest }) ?? 0;

  return Math.max(0, foundIndex - overScanCount);
};

export const findEndIndex = ({
  scrollTop,
  itemsTotalCount,
  offsets,
  containerHeight,
  overScanCount,
}: FindEndIndexParams) => {
  const foundIndex = findIndex({
    offset: scrollTop + containerHeight,
    itemsTotalCount,
    offsets,
  });
  const lastIndex = itemsTotalCount - 1;

  if (foundIndex === null) return lastIndex;

  return Math.min(lastIndex, foundIndex + overScanCount);
};

export const findDynamicVirtualListIndexes = ({
  containerHeight,
  ...defaultParams
}: FindStartIndexParams & Pick<FindEndIndexParams, 'containerHeight'>) => {
  return {
    startIndex: findStartIndex(defaultParams),
    endIndex: findEndIndex({ ...defaultParams, containerHeight }),
  };
};
