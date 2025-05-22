import { useEffect } from 'react';

import { UsePopoverFocusEffectProps } from '@/components/Popover/Popover/types';

const usePopoverFocusEffect = ({
  popoverRef,
  useAutoFocus,
  isOpen,
}: UsePopoverFocusEffectProps) => {
  useEffect(() => {
    const popover = popoverRef.current;

    if (isOpen && useAutoFocus && popover) {
      popover.focus();
    }
  }, [isOpen, popoverRef, useAutoFocus]);
};

export default usePopoverFocusEffect;
