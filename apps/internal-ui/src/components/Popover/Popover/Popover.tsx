import { useClickOutside } from '@bbodek/hooks';
import { executeFunction } from '@bbodek/utils';
import { cloneElement, isValidElement, useRef } from 'react';

import { POPOVER_PLACEMENTS } from '@/components/Popover/Popover/constants';
import {
  useOutSideScrollLockEffect,
  usePopover,
} from '@/components/Popover/Popover/hooks';
import usePopoverFocusEffect from '@/components/Popover/Popover/hooks/effects/usePopoverFocusEffect';
import usePopoverPosition from '@/components/Popover/Popover/hooks/usePopoverPosition';
import { PopoverProps } from '@/components/Popover/Popover/types';
import { Portal } from '@/components/Portal';

const Popover = <T extends HTMLElement>({
  trigger,
  rootRef,
  children,
  offset = 8,
  placement = POPOVER_PLACEMENTS.BOTTOM_LEFT,
  applyMaxWidth = false,
  useClickOutsideEvent = true,
  useAutoFocus = true,
  isOpen,
  onPopoverClose,
  threshold = 2,
}: PopoverProps) => {
  const triggerRef = useRef<T>(null);
  const { triggerProps, popoverProps } = usePopover({
    trigger,
    isOpen,
  });
  const { contentRef: popoverRef } = useClickOutside<HTMLDivElement>({
    onClose: (e) => {
      executeFunction({
        disabled:
          !triggerRef.current || triggerRef.current.contains(e.target as Node),
        fn: () => {
          onPopoverClose?.();
        },
      });
    },
    useClickOutsideEvent: useClickOutsideEvent && isOpen,
  });
  const { style } = usePopoverPosition({
    offset,
    applyMaxWidth,
    triggerRef,
    rootRef,
    popoverRef,
    isOpen,
    placement,
    threshold,
  });

  useOutSideScrollLockEffect({ popoverRef, rootRef, isOpen });
  usePopoverFocusEffect({ popoverRef, isOpen, useAutoFocus });

  if (!isValidElement(trigger) || !isValidElement(children)) return null;

  return (
    <>
      {cloneElement(trigger, {
        ...triggerProps({ triggerRef }),
      })}
      {isOpen && (
        <Portal>
          <div {...popoverProps({ popoverRef, style })}>{children}</div>
        </Portal>
      )}
    </>
  );
};

export default Popover;
