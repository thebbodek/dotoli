import { RefObject } from 'react';

import { DynamicVirtualListContextProps } from '@/components/VirtualList/DynamicVirtualList/types';

export interface UseVirtualListItemResizeObserverEffectParams {
  ref: RefObject<HTMLElement | null>;
  dataIndex: number;
}

export interface UseVirtualItemsMetricsInitEffectParams
  extends Pick<
    DynamicVirtualListContextProps,
    | 'gap'
    | 'initialItemHeight'
    | 'itemsTotalCount'
    | 'heightsRef'
    | 'updateOffsets'
  > {}

export interface UpdateHeightParams {
  height: number;
}

export interface UseVirtualListUpdateOffsetsCancelAnimationFrameEffectParams {
  rafIdRef: RefObject<number>;
}
