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
      // 내부 요소(autoFocus input 등)가 이미 focus를 가진 경우 popover가 focus를 뺏지 않는다
      if (popover.contains(document.activeElement)) return;

      popover.focus();
    }
  }, [isOpen, popoverRef, useAutoFocus]);
};

export default usePopoverFocusEffect;
