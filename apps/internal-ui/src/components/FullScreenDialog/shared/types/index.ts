import {
  DialogOverlayContentWrapperProps,
  FormDialogOverlayProps,
  OverlayBasePrimitiveProps,
} from '@/components/shared';

export interface FullScreenDialogProps extends OverlayBasePrimitiveProps {}

export interface FullScreenDialogContentWrapperProps
  extends DialogOverlayContentWrapperProps {}

export interface FullScreenDialogHeaderProps
  extends Pick<FormDialogOverlayProps, 'onCancel' | 'title' | 'isPending'> {}
