import {
  FormDialogOverlayProps,
  OverlayBasePrimitiveProps,
  OverlayContentWrapperProps,
} from '@/components/shared';

export interface FullScreenDialogProps extends OverlayBasePrimitiveProps {}

export interface FullScreenDialogContentWrapperProps
  extends OverlayContentWrapperProps {}

export interface FullScreenDialogHeaderProps
  extends Pick<FormDialogOverlayProps, 'onCancel' | 'title' | 'isPending'> {}
