import { useEffect } from 'react';

import { UseScrollLockOutSideEffectProps } from '@/components/Popover/Popover/types';

const useOutSideScrollLockEffect = ({
  popoverRef,
  rootRef,
  isOpen,
}: UseScrollLockOutSideEffectProps) => {
  const handleScrollLock = (e: Event) => {
    const popover = popoverRef.current;

    if (!popover || popover.contains(e.target as Node)) return;

    e.preventDefault();
    e.stopPropagation();

    return false;
  };

  const handleOnScrollEvent = (el: HTMLElement) => {
    el.addEventListener('scroll', handleScrollLock, { passive: false });
    el.addEventListener('wheel', handleScrollLock, { passive: false });
    el.addEventListener('touchmove', handleScrollLock, { passive: false });
  };

  const handleOffScrollEvent = (el: HTMLElement) => {
    el.removeEventListener('scroll', handleScrollLock);
    el.removeEventListener('wheel', handleScrollLock);
    el.removeEventListener('touchmove', handleScrollLock);
  };

  useEffect(() => {
    const popover = popoverRef.current;

    if (!popover) return;

    const root = rootRef?.current ?? document.body;
    const overflowClasses = [
      'overflow-y-auto',
      'overflow-auto',
      'overflow-x-auto',
      'overflow-scroll',
      'overflow-x-scroll',
      'overflow-y-scroll',
    ];
    const overflows = overflowClasses.map((c) => `.${c}`).join(', ');
    const overflowItems = [root, ...root.querySelectorAll(overflows)];

    if (!overflowItems.length) return;

    overflowItems.forEach((item) => {
      const el = item as HTMLElement;
      isOpen ? handleOnScrollEvent(el) : handleOffScrollEvent(el);
    });

    return () =>
      overflowItems.forEach((el) => handleOffScrollEvent(el as HTMLElement));
  }, [popoverRef, rootRef, isOpen]);
};

export default useOutSideScrollLockEffect;
