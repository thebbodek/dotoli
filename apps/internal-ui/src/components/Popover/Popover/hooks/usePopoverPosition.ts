import { CSSProperties, useRef, useState } from 'react';

import { useUpdatePopoverPositionEffect } from '@/components/Popover/Popover/hooks/effects';
import { UseUpdatePopoverPositionProps } from '@/components/Popover/Popover/types/PopoverPosition';

const usePopoverPosition = <T extends Element>({
  // close,
  isOpen,
  gap,
}: UseUpdatePopoverPositionProps) => {
  const triggerRef = useRef<T | null>(null);
  const popoverRef = useRef<T | null>(null);
  // const { contentRef: popoverRef } = useClickOutside<T>((e) => {
  //   if (!triggerRef.current || triggerRef.current.contains(e.target as Node)) {
  //     return;
  //   }

  //   close();
  // }, useClickOutsideEvent && isOpen);
  const [style, setStyle] = useState<CSSProperties>({
    position: 'fixed',
    opacity: 0,
    paddingTop: gap,
    transition: 'opacity 0.2s ease-in-out',
  });

  // useOutSideScrollLockEffect({ ref: popoverRef, isOpen });
  useUpdatePopoverPositionEffect({
    triggerRef,
    popoverRef,
    setStyle,
    isOpen,
    gap,
  });

  return { style, triggerRef, popoverRef };
};

export default usePopoverPosition;
