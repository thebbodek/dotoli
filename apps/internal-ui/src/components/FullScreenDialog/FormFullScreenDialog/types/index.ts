import { FormDialogOverlayProps } from '@/components/shared';

export interface FormFullScreenDialogProps
  extends Omit<FormDialogOverlayProps, 'cancelOption'> {
  cancelOption: { label?: string; onCancel: () => void };
}
