import { Dispatch, RefObject, SetStateAction } from 'react';

import { UseVirtualListReturnType } from '@/components/VirtualList/shared/hooks/types';

export interface UseCalculateContainerHeightEffectProps
  extends Pick<UseVirtualListReturnType['models'], 'containerRef'> {
  setContainerHeight: Dispatch<SetStateAction<number>>;
}

export interface UseScrollRequestAnimationFrameCleanUpEffectProps {
  scrollRafId: RefObject<number>;
}
