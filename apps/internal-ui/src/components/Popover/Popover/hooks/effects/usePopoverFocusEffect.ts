import { useEffect } from 'react';

import { UsePopoverFocusEffectProps } from '@/components/Popover/Popover/types';

const usePopoverFocusEffect = ({
  popoverRef,
  isOpen,
}: UsePopoverFocusEffectProps) => {
  useEffect(() => {
    if (isOpen) {
      popoverRef.current?.focus();
    }
  }, [isOpen, popoverRef.current]);
};

export default usePopoverFocusEffect;
