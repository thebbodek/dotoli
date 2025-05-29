import {
  ModalButtonsProps,
  ModalPrimitiveProps,
} from '@/components/Modal/Modal';

export interface InfoModalProps
  extends ModalPrimitiveProps,
    Partial<
      Pick<ModalButtonsProps, 'submitButtonLabel' | 'cancelButtonLabel'>
    > {}
