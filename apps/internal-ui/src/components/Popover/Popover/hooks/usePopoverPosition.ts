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
}: UsePopoverPositionProps) => {
  const [style, setStyle] = useState<PopoverStyle>({
    position: 'fixed',
    opacity: 0,
    left: 0,
    top: 0,
    zIndex: 10000,
    paddingTop: offset,
    paddingBottom: 0,
    minWidth: 'auto',
    maxWidth: 'none',
  });

  usePopoverPositionEffect({
    triggerRef,
    popoverRef,
    setStyle,
    isOpen,
    offset,
    applyMaxWidth,
  });

  return { style };
};

export default usePopoverPosition;
