import clsx from 'clsx';
import { default as ReactSkeleton } from 'react-loading-skeleton';

import {
  SKELETON_BASE_COLOR,
  SKELETON_HIGHLIGHT_COLOR,
  SKELETON_RADIUS,
} from '@/components/Skeleton/constants';
import { SkeletonProps } from '@/components/Skeleton/types';

const Skeleton = ({
  containerClassName,
  borderRadius = SKELETON_RADIUS,
  ...props
}: SkeletonProps) => {
  return (
    <ReactSkeleton
      {...props}
      baseColor={SKELETON_BASE_COLOR}
      highlightColor={SKELETON_HIGHLIGHT_COLOR}
      borderRadius={borderRadius}
      containerClassName={clsx('flex w-full items-center', containerClassName)}
    />
  );
};

export default Skeleton;
