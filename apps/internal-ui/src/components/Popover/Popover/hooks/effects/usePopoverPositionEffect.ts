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
  const resetPosition = () => {
    setStyle((prevStyle) => ({
      ...prevStyle,
      opacity: 0,
    }));
  };

  useEffect(() => {
    if (!isOpen) return;

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

        setStyle((prevStyle) => ({
          ...prevStyle,
          ...style,
          opacity: 1,
        }));
      });
    };

    setPopoverPosition();

    const observer = new ResizeObserver(setPopoverPosition);

    observer.observe(document.body);
    observer.observe(trigger);
    observer.observe(popover);
    root && observer.observe(root);

    return () => {
      resetPosition();
      observer.disconnect();
    };
  }, [
    triggerRef,
    popoverRef,
    rootRef,
    isOpen,
    offset,
    applyMaxWidth,
    placement,
    threshold,
  ]);
};

export default usePopoverPositionEffect;
