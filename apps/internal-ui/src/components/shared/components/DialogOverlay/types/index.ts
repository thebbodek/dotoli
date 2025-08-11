import {
  OverlayFooterStateProps,
  OverlayPrimitiveProps,
} from '@/components/shared/components/Overlay';

export interface DialogOverlayProps extends OverlayPrimitiveProps {}

export interface FormDialogOverlayProps
  extends DialogOverlayProps,
    OverlayFooterStateProps {}

export interface InfoDialogOverlayPrimitiveProps
  extends Omit<DialogOverlayProps, 'confirmOption' | 'cancelOption'> {}
