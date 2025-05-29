import {
  ModalButtonsProps,
  ModalPrimitiveProps,
} from '@/components/Modal/Modal';

export interface ConfirmModalProps
  extends ModalPrimitiveProps,
    Partial<
      Pick<ModalButtonsProps, 'submitButtonLabel' | 'cancelButtonLabel'>
    > {
  useIcon?: boolean;
}
