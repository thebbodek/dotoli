import { ElementType, ReactNode, RefObject } from 'react';

import {
  VirtualListChildrenPrimitiveProps,
  VirtualListItemBaseProps,
  VirtualListPrimitiveProps,
} from '@/components/VirtualList/shared';

export interface DynamicVirtualListProps<
  T extends ElementType = 'div',
  P extends ElementType = 'div',
> extends Omit<VirtualListPrimitiveProps<T, P>, 'itemHeight'> {
  initialItemHeight: number;
  overScanCount?: number;
  children: (params: VirtualListChildrenPrimitiveProps) => ReactNode;
}

export type VirtualListItemHeights = number[];

export type VirtualListItemOffsets = number[];

export interface DynamicVirtualListContextProps
  extends Required<
      Pick<
        DynamicVirtualListProps,
        'gap' | 'initialItemHeight' | 'itemsTotalCount'
      >
    >,
    Pick<VirtualListChildrenPrimitiveProps, 'startIndex'> {
  heightsRef: RefObject<VirtualListItemHeights>;
  offsets: VirtualListItemOffsets;
  updateOffsets: () => void;
}

export interface DynamicVirtualListProviderProps
  extends DynamicVirtualListContextProps {}

export interface DynamicVirtualListItemProps<T extends ElementType = 'div'>
  extends Omit<VirtualListItemBaseProps<T>, 'topPosition'> {
  index: number;
}
