import { useEffect } from 'react';

import { UseInitialFocusEffectProps } from '@/components/shared/Overlay/types';

export const useInitialFocusEffect = ({
  isOpen,
  dialogRef,
}: UseInitialFocusEffectProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const previousElement = document.activeElement;

    dialogRef.current?.focus();

    return () => {
      if (previousElement instanceof HTMLElement) previousElement.focus();
    };
  }, [isOpen, dialogRef]);
};
