import { DialogHTMLAttributes, HTMLAttributes, RefObject } from 'react';

import { PortalProps } from '@/components/Portal';
import { OVERLAY_VARIANTS } from '@/components/shared/Overlay/constants';

export type OverlayVariant =
  (typeof OVERLAY_VARIANTS)[keyof typeof OVERLAY_VARIANTS];

export interface OverlayProps
  extends Pick<PortalProps, 'target'>,
    Pick<
      DialogHTMLAttributes<HTMLDialogElement>,
      'className' | 'aria-label' | 'aria-labelledby'
    > {
  variant: OverlayVariant;
  isOpen: boolean;
  isDimmed?: boolean;
  contentClassName?: HTMLAttributes<HTMLDivElement>['className'];
  onClose?: () => void;
}

export interface UseScrollLockEffectProps {
  isLocked: boolean;
}

export interface UseInitialFocusEffectProps
  extends Pick<OverlayProps, 'isOpen'> {
  dialogRef: RefObject<HTMLDialogElement | null>;
}

export interface UseEscapeCloseEffectProps
  extends UseInitialFocusEffectProps,
    Pick<OverlayProps, 'onClose'> {}
