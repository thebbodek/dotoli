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
  rootRef,
  isOpen,
  placement,
  threshold,
}: UsePopoverPositionProps) => {
  const [style, setStyle] = useState<PopoverStyle>({
    position: 'fixed',
    zIndex: 10000,
    opacity: 0,
  });

  usePopoverPositionEffect({
    triggerRef,
    popoverRef,
    rootRef,
    setStyle,
    isOpen,
    offset,
    applyMaxWidth,
    placement,
    threshold,
  });

  return { style };
};

export default usePopoverPosition;
