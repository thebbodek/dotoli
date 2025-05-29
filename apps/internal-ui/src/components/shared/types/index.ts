import { DialogHTMLAttributes, RefObject } from 'react';

import { PortalProps } from '@/components/Portal';
import { OVERLAY_VARIANTS } from '@/components/shared/constants';

export interface ComponentPropsRef<T> {
  ref?: RefObject<T | null>;
}

export type OverlayVariant =
  (typeof OVERLAY_VARIANTS)[keyof typeof OVERLAY_VARIANTS];

export interface OverlayProps
  extends Pick<PortalProps, 'target'>,
    Pick<DialogHTMLAttributes<HTMLDialogElement>, 'className'>,
    ComponentPropsRef<HTMLDialogElement> {
  variant: OverlayVariant;
  isOpen: boolean;
  dimmed?: boolean;
}
