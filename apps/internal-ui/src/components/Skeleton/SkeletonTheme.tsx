import { SkeletonTheme as ReactSkeletonTheme } from 'react-loading-skeleton';

import {
  SKELETON_BASE_COLOR,
  SKELETON_HIGHLIGHT_COLOR,
  SKELETON_RADIUS,
} from '@/components/Skeleton/constants';
import { SkeletonThemeProps } from './types';

const SkeletonTheme = ({
  children,
  borderRadius = SKELETON_RADIUS,
  ...props
}: SkeletonThemeProps) => {
  return (
    <ReactSkeletonTheme
      {...props}
      baseColor={SKELETON_BASE_COLOR}
      highlightColor={SKELETON_HIGHLIGHT_COLOR}
      borderRadius={borderRadius}
    >
      {children}
    </ReactSkeletonTheme>
  );
};

export default SkeletonTheme;
