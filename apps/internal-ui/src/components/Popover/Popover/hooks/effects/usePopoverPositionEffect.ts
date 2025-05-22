import { useEffect } from 'react';

import { UsePopoverPositionEffectProps } from '@/components/Popover/Popover/types';
import { getPopoverPosition } from '@/components/Popover/Popover/utils';

const usePopoverPositionEffect = ({
  isOpen,
  triggerRef,
  popoverRef,
  rootRef,
  setStyle,
  offset,
  applyMaxWidth,
  placement,
  threshold,
}: UsePopoverPositionEffectProps) => {
  useEffect(() => {
    const trigger = triggerRef.current;
    const popover = popoverRef.current;
    const root = rootRef?.current;

    if (!trigger || !popover) return;

    const setPopoverPosition = () => {
      requestAnimationFrame(() => {
        const style = getPopoverPosition({
          root,
          trigger,
          popover,
          offset,
          applyMaxWidth,
          placement,
          threshold,
        });

        setStyle({ ...style, opacity: isOpen ? 1 : 0 });
      });
    };

    const observer = new ResizeObserver(setPopoverPosition);

    observer.observe(document.body);
    observer.observe(trigger);
    observer.observe(popover);
    root && observer.observe(root);

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
    placement,
    threshold,
    rootRef,
  ]);
};

export default usePopoverPositionEffect;
