import { useEffect, useRef } from 'react';

import {
  OVERLAY_DIALOG_SELECTOR,
  OVERLAY_ESCAPE_KEY,
} from '@/components/shared/Overlay/constants';
import { UseEscapeCloseEffectProps } from '@/components/shared/Overlay/types';

export const useEscapeCloseEffect = ({
  isOpen,
  dialogRef,
  onClose,
}: UseEscapeCloseEffectProps) => {
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== OVERLAY_ESCAPE_KEY || event.isComposing) return;

      const dialogs = document.querySelectorAll(OVERLAY_DIALOG_SELECTOR);

      if (dialogs[dialogs.length - 1] !== dialogRef.current) return;

      onCloseRef.current?.();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, dialogRef]);
};
