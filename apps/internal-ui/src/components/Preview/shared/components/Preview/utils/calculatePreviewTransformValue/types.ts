import { PREVIEW_TRANSFORM_TYPE } from '@/components/Preview/shared/components/Preview/constants';
import {
  PreviewRotate,
  PreviewScale,
} from '@/components/Preview/shared/components/Preview/hooks';
import { PREVIEW_TRANSFORM_DIRECTION } from '@/components/Preview/shared/components/Preview/utils/calculatePreviewTransformValue/constants';

export type PreviewTransformDirection =
  (typeof PREVIEW_TRANSFORM_DIRECTION)[keyof typeof PREVIEW_TRANSFORM_DIRECTION];

export type PreviewTransformType =
  (typeof PREVIEW_TRANSFORM_TYPE)[keyof typeof PREVIEW_TRANSFORM_TYPE];

export interface CalculatePreviewTransformValueProps<
  T extends PreviewScale | PreviewRotate,
> {
  value: T;
  type: PreviewTransformType;
  direction?: PreviewTransformDirection;
}
