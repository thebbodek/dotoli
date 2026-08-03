import { GetEstimatedOffsetsParams } from '@/components/VirtualList/DynamicVirtualList/utils/types';

export const getEstimatedOffsets = ({
  offsets,
  itemsTotalCount,
  initialItemHeight,
  gap,
}: GetEstimatedOffsetsParams) => {
  const estimatedItemHeight = initialItemHeight + gap;
  const estimatedOffsets = offsets.length ? [...offsets] : [0];

  for (
    let index = estimatedOffsets.length - 1;
    index < itemsTotalCount;
    index++
  ) {
    estimatedOffsets[index + 1] = estimatedOffsets[index] + estimatedItemHeight;
  }

  return estimatedOffsets.slice(0, itemsTotalCount + 1);
};
