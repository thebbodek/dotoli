import { DialogOverlayProps } from '@/components/shared';

export interface InfoFullScreenDialogProps
  extends Omit<
    DialogOverlayProps,
    'confirmButtonLabel' | 'onConfirm' | 'onCancel' | 'cancelButtonLabel'
  > {
  onClose: () => void;
}
