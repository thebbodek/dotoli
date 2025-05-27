import { useEffect } from 'react';

import { UsePopoverPositionEffectProps } from '@/components/Popover/Popover/types';
import { getPopoverPosition } from '@/components/Popover/Popover/utils';

const usePopoverPositionEffect = ({
  isOpen,
  triggerRef,
  popoverRef,
  setStyle,
  offset,
  applyMaxWidth,
  depth,
}: UsePopoverPositionEffectProps) => {
  useEffect(() => {
    const trigger = triggerRef.current;
    const popover = popoverRef.current;

    if (!trigger || !popover) return;

    const root = trigger.closest('.popover-root') || document.body;

    const setPopoverPosition = () => {
      const style = getPopoverPosition({
        trigger,
        popover,
        root: root as HTMLElement,
        offset,
        applyMaxWidth,
      });

      setStyle((prevStyle) => ({
        ...prevStyle,
        ...style,
        opacity: isOpen ? 1 : 0,
      }));
    };

    const observer = new ResizeObserver(setPopoverPosition);

    observer.observe(root);
    observer.observe(trigger);
    observer.observe(popover);

    if (isOpen) {
      setPopoverPosition();
    }

    return () => observer.disconnect();
  }, [
    triggerRef,
    popoverRef,
    isOpen,
    offset,
    applyMaxWidth,
    setStyle,
    ...(depth || []),
  ]);
};

export default usePopoverPositionEffect;
