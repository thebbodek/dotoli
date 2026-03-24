import { ElementType, ReactNode } from 'react';

import {
  VirtualListChildrenPrimitiveProps,
  VirtualListItemBaseProps,
  VirtualListPrimitiveProps,
} from '@/components/VirtualList/shared';

export interface StaticVirtualListChildrenProps
  extends VirtualListChildrenPrimitiveProps {
  getTopPosition: ({ index }: GetTopPositionParams) => number;
}

export interface GetTopPositionParams {
  index: number;
}

export interface StaticVirtualListProps<
  T extends ElementType = 'div',
  P extends ElementType = 'div',
> extends VirtualListPrimitiveProps<T, P> {
  children: ({
    startIndex,
    endIndex,
    getTopPosition,
  }: StaticVirtualListChildrenProps) => ReactNode;
}

export interface StaticVirtualListItemProps<T extends ElementType = 'div'>
  extends VirtualListItemBaseProps<T> {
  height: number;
}
