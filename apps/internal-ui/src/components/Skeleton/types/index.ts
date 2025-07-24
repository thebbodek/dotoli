import {
  SkeletonProps as ReactSkeletonProps,
  SkeletonThemeProps as ReactSkeletonThemeProps,
  SkeletonStyleProps,
} from 'react-loading-skeleton';

export type SkeletonExcludeProps = Extract<
  keyof SkeletonStyleProps,
  | 'baseColor'
  | 'highlightColor'
  | 'duration'
  | 'direction'
  | 'enableAnimation'
  | 'customHighlightBackground'
>;

export interface SkeletonProps
  extends Omit<ReactSkeletonProps, SkeletonExcludeProps> {}

export interface SkeletonThemeProps
  extends Omit<ReactSkeletonThemeProps, SkeletonExcludeProps> {}
