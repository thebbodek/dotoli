import { useEffect } from 'react';

import { UsePopoverFocusEffectProps } from '@/components/Popover/Popover/types';

const usePopoverFocusEffect = ({
  popoverRef,
  useAutoFocus,
  isOpen,
}: UsePopoverFocusEffectProps) => {
  useEffect(() => {
    if (isOpen && useAutoFocus) {
      popoverRef.current?.focus();
    }
  }, [isOpen, popoverRef.current, useAutoFocus]);
};

export default usePopoverFocusEffect;
