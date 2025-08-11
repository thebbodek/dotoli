import { useScrollLockEffect } from '@bbodek/hooks';
import clsx from 'clsx';
import {
  PropsWithChildren,
  ReactElement,
  cloneElement,
  isValidElement,
} from 'react';

import { Portal } from '@/components/Portal';
import {
  OVERLAY_CONTENT_POSITION,
  OVERLAY_CONTENT_SIZE,
  OVERLAY_VARIANTS,
} from '@/components/shared/components/Overlay/constants';
import OverlayLoading from '@/components/shared/components/Overlay/OverlayLoading';
import { OverlayProps } from '@/components/shared/components/Overlay/types';

const Overlay = ({
  target,
  variant,
  isOpen,
  dimmed = false,
  children,
  ref,
  onClose,
  useClickOutsideEvent,
  ...props
}: PropsWithChildren<OverlayProps>) => {
  const { className, ...rest } = props;

  useScrollLockEffect({ isLocked: isOpen });

  if (!isOpen || !children) return null;

  const isReactElement = (children: unknown): children is ReactElement => {
    return isValidElement(children);
  };

  const _children = isReactElement(children) ? children : <div>{children}</div>;

  return (
    <Portal target={target}>
      <dialog
        ref={ref}
        className={clsx(
          className,
          'open:animate-in-fade-in left-0 top-0 z-[1000] h-full w-full overflow-hidden',
          variant === OVERLAY_VARIANTS['MODAL'] && 'in-safe-area-bottom',
          OVERLAY_CONTENT_POSITION[variant],
          dimmed && 'bg-in-dimmed',
        )}
        open={isOpen}
        {...rest}
      >
        {cloneElement(_children, {
          className: clsx(
            _children.props.className,
            OVERLAY_CONTENT_SIZE[variant],
          ),
        })}
      </dialog>
    </Portal>
  );
};

export default Overlay;

Overlay.displayName = 'Overlay';
Overlay.Loading = OverlayLoading;
