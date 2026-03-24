import {
  DynamicVirtualListContextProps,
  DynamicVirtualListProps,
  VirtualListItemOffsets,
} from '@/components/VirtualList/DynamicVirtualList/types';
import { UseVirtualListReturnType } from '@/components/VirtualList/shared';

export interface FindIndexParams
  extends Pick<DynamicVirtualListProps, 'itemsTotalCount'>,
    Pick<DynamicVirtualListContextProps, 'offsets'> {
  offset: VirtualListItemOffsets[0];
}

export interface FindIndexDefaultParams
  extends Omit<FindIndexParams, 'offset'>,
    Required<Pick<DynamicVirtualListProps, 'overScanCount'>>,
    Pick<UseVirtualListReturnType['models'], 'scrollTop'> {}

export interface FindStartIndexParams extends FindIndexDefaultParams {}

export interface FindEndIndexParams
  extends FindIndexDefaultParams,
    Pick<UseVirtualListReturnType['models'], 'containerHeight'> {}
