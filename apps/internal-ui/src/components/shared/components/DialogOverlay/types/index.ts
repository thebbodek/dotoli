import { HTMLAttributes } from 'react';

import { DIALOG_OVERLAY_CONTENT_WRAPPER_ELEMENTS } from '@/components/shared/components/DialogOverlay/constants';
import {
  OverlayFooterStateProps,
  OverlayPrimitiveProps,
} from '@/components/shared/components/Overlay';

export interface DialogOverlayProps extends OverlayPrimitiveProps {}

export type DialogOverlayContentWrapperElements =
  (typeof DIALOG_OVERLAY_CONTENT_WRAPPER_ELEMENTS)[keyof typeof DIALOG_OVERLAY_CONTENT_WRAPPER_ELEMENTS];

export interface DialogOverlayContentWrapperProps
  extends Pick<HTMLAttributes<HTMLElement>, 'className'> {
  as?: DialogOverlayContentWrapperElements;
}

export interface FormDialogOverlayProps
  extends DialogOverlayProps,
    OverlayFooterStateProps {}
