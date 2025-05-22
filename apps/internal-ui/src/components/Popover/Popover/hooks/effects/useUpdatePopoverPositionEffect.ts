import { useEffect } from 'react';

import { UseUpdatePopoverPositionEffectProps } from '@/components/Popover/Popover/types/PopoverPosition';
import { getPopoverPosition } from '@/components/Popover/Popover/utils';

const useUpdatePopoverPositionEffect = ({
  isOpen,
  triggerRef,
  popoverRef,
  setStyle,
  gap,
  applyMaxWidth,
}: UseUpdatePopoverPositionEffectProps) => {
  useEffect(() => {
    const trigger = triggerRef.current;
    const popover = popoverRef.current;

    if (!trigger || !popover) return;

    const root = trigger.closest('.popover-root') || document.body;

    const updatePosition = () => {
      const style = getPopoverPosition({
        trigger,
        popover,
        root: root as HTMLElement,
        gap,
        applyMaxWidth,
      });

      setStyle((prevStyle) => ({
        ...prevStyle,
        ...style,
        opacity: isOpen ? 1 : 0,
      }));
    };

    const observer = new ResizeObserver(updatePosition);

    observer.observe(root);
    observer.observe(trigger);
    observer.observe(popover);

    if (isOpen) {
      updatePosition();
    }

    return () => observer.disconnect();
  }, [triggerRef, popoverRef, isOpen]);
};

export default useUpdatePopoverPositionEffect;
