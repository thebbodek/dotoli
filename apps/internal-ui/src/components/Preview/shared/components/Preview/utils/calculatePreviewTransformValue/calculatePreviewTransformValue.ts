import { PREVIEW_TRANSFORM_VALUES } from '@/components/Preview/shared/components/Preview/constants';
import {
  PreviewRotate,
  PreviewScale,
} from '@/components/Preview/shared/components/Preview/hooks';
import {
  PREVIEW_TRANSFORM_DIRECTION,
  PREVIEW_TRANSFORM_STEP,
} from '@/components/Preview/shared/components/Preview/utils/calculatePreviewTransformValue/constants';
import { CalculatePreviewTransformValueProps } from '@/components/Preview/shared/components/Preview/utils/calculatePreviewTransformValue/types';

export const calculatePreviewTransformValue = <
  T extends PreviewScale | PreviewRotate,
>({
  type,
  value: prevValue,
  direction = PREVIEW_TRANSFORM_DIRECTION.UP,
}: CalculatePreviewTransformValueProps<T>) => {
  const step = PREVIEW_TRANSFORM_STEP[type];
  const currentValue =
    typeof prevValue === 'number'
      ? prevValue
      : PREVIEW_TRANSFORM_VALUES[type].MAX;
  const value =
    direction === PREVIEW_TRANSFORM_DIRECTION.UP
      ? currentValue + step
      : currentValue - step;

  return value as T;
};
