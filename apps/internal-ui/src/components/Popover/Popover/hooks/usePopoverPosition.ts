import { useState } from 'react';

import { usePopoverPositionEffect } from '@/components/Popover/Popover/hooks/effects';
import {
  PopoverStyle,
  UsePopoverPositionProps,
} from '@/components/Popover/Popover/types';

const usePopoverPosition = ({
  offset,
  applyMaxWidth,
  triggerRef,
  popoverRef,
  isOpen,
  placement,
}: UsePopoverPositionProps) => {
  const [style, setStyle] = useState<PopoverStyle>({
    position: 'fixed',
    opacity: 0,
    zIndex: 10000,
  });

  usePopoverPositionEffect({
    triggerRef,
    popoverRef,
    setStyle,
    isOpen,
    offset,
    applyMaxWidth,
    placement,
  });

  return { style };
};

export default usePopoverPosition;
