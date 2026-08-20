import clsx from 'clsx';
import { PropsWithChildren, useRef } from 'react';

import { Portal } from '@/components/Portal';
import {
  OVERLAY_BACKDROP_BASE_STYLE,
  OVERLAY_BASE_STYLE,
  OVERLAY_CONTENT_BASE_STYLE,
  OVERLAY_CONTENT_STYLES,
  OVERLAY_DIM_STYLE,
  OVERLAY_POSITION_STYLES,
} from '@/components/shared/Overlay/constants';
import {
  useEscapeCloseEffect,
  useInitialFocusEffect,
  useScrollLockEffect,
} from '@/components/shared/Overlay/hooks/effects';
import { OverlayProps } from '@/components/shared/Overlay/types';

const Overlay = ({
  variant,
  isOpen,
  isDimmed = true,
  target,
  className,
  contentClassName,
  children,
  onClose,
  ...rest
}: PropsWithChildren<OverlayProps>) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useScrollLockEffect({ isLocked: isOpen });
  useEscapeCloseEffect({ isOpen, dialogRef, onClose });
  useInitialFocusEffect({ isOpen, dialogRef });

  if (!isOpen) return null;

  const backdropClassName = clsx(
    OVERLAY_BACKDROP_BASE_STYLE,
    isDimmed && OVERLAY_DIM_STYLE,
  );

  return (
    <Portal target={target}>
      <dialog
        className={clsx(
          className,
          OVERLAY_BASE_STYLE,
          OVERLAY_POSITION_STYLES[variant],
        )}
        data-overlay=''
        open={isOpen}
        ref={dialogRef}
        tabIndex={-1}
        {...rest}
      >
        {onClose ? (
          <button
            aria-label='닫기'
            className={backdropClassName}
            type='button'
            onClick={onClose}
          />
        ) : (
          <div className={backdropClassName} aria-hidden />
        )}
        <div
          className={clsx(
            contentClassName,
            OVERLAY_CONTENT_BASE_STYLE,
            OVERLAY_CONTENT_STYLES[variant],
          )}
        >
          {children}
        </div>
      </dialog>
    </Portal>
  );
};

export default Overlay;
