import { GetSingleSelectVirtualListIndexesParams } from '@/components/Select/Single/shared/types';

export const getSingleSelectVirtualListIndexes = ({
  startIndex,
  endIndex,
  itemsTotalCount,
  focusedIndex,
}: GetSingleSelectVirtualListIndexesParams) => {
  const rangeIndexes = Array.from(
    { length: endIndex - startIndex },
    (_, index) => startIndex + index,
  );
  const pinnedIndexes = [0, focusedIndex, itemsTotalCount - 1].filter(
    (index): index is number =>
      index !== null &&
      index < itemsTotalCount &&
      (index < startIndex || index >= endIndex),
  );

  return [...new Set([...pinnedIndexes, ...rangeIndexes])].sort(
    (a, b) => a - b,
  );
};
