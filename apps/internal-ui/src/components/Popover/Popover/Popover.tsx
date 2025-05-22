import { useClickOutside } from '@bbodek/hooks';
import { executeFunction } from '@bbodek/utils';
import { cloneElement, useRef } from 'react';

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
  children,
  offset = 4,
  useHover = false,
  applyMaxWidth = false,
}: PopoverProps) => {
  const triggerRef = useRef<T | null>(null);
  const { triggerProps, close, childProps, isOpen, isValidElements, child } =
    usePopover({
      trigger,
      children,
      useHover,
    });
  const { contentRef: popoverRef } = useClickOutside<T>({
    onClose: (e) => {
      executeFunction({
        disabled:
          !triggerRef.current || triggerRef.current.contains(e.target as Node),
        fn: close,
      });
    },
    useClickOutsideEvent: !useHover && isOpen,
  });
  const { style } = usePopoverPosition({
    offset,
    applyMaxWidth,
    triggerRef,
    popoverRef,
    isOpen,
  });

  useOutSideScrollLockEffect({ ref: popoverRef, isOpen });
  usePopoverFocusEffect({ popoverRef, isOpen });

  if (!isValidElements) return null;

  return (
    <>
      {cloneElement(trigger, {
        ...triggerProps({ triggerRef }),
      })}
      {isOpen && (
        <Portal>
          {cloneElement(child, {
            ...childProps({ popoverRef, popoverStyle: style }),
          })}
        </Portal>
      )}
    </>
  );
};

export default Popover;
