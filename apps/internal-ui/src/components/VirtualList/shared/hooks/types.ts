import { UIEvent } from 'react';

import { VirtualListRootWrapperProps } from '@/components/VirtualList/shared/types';

export interface UseVirtualListReturnType {
  models: Pick<VirtualListRootWrapperProps, 'containerRef'> & {
    scrollTop: number;
    containerHeight: number;
  };
  operations: {
    onScroll: (e: UIEvent<HTMLElement>) => void;
  };
}
