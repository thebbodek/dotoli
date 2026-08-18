import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { Portal } from '@/components/Portal';
import {
  OVERLAY_BACKDROP_BASE_STYLE,
  OVERLAY_BASE_STYLE,
  OVERLAY_CONTENT_BASE_STYLE,
  OVERLAY_CONTENT_STYLES,
  OVERLAY_DIM_STYLE,
  OVERLAY_POSITION_STYLES,
} from '@/components/shared/Overlay/constants';
import { useScrollLockEffect } from '@/components/shared/Overlay/hooks/effects';
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
  useScrollLockEffect({ isLocked: isOpen });

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
        open={isOpen}
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
