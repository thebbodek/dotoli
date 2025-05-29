import { HTMLAttributes, ReactNode } from 'react';

import ModalButtons from '@/components/Modal/Modal/ModalButtons';
import ModalDescription from '@/components/Modal/Modal/ModalDescription';
import ModalTitle from '@/components/Modal/Modal/ModalTitle';
import { ModalBaseProps } from '@/components/Modal/ModalBase';
import { TYPOGRAPHY_ELEMENTS, TypographyProps } from '@/components/Typography';

export interface ModalProps
  extends Pick<ModalBaseProps, 'isOpen' | 'ref' | 'className'> {}

export interface ModalPrimitiveProps extends ModalProps {
  title: ReactNode;
  description: ReactNode;
  onConfirm: () => void;
  onCancel?: () => void;
}

export interface ModalTitleProps
  extends Pick<ModalPrimitiveProps, 'title'>,
    Pick<TypographyProps<typeof TYPOGRAPHY_ELEMENTS.STRONG>, 'className'> {}

export interface ModalDescriptionProps
  extends Pick<ModalPrimitiveProps, 'description'>,
    Pick<TypographyProps<typeof TYPOGRAPHY_ELEMENTS.P>, 'className'> {}

export interface ModalButtonsProps
  extends Pick<ModalPrimitiveProps, 'onConfirm' | 'onCancel'>,
    Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  submitButtonLabel: string;
  cancelButtonLabel: string;
}

export type ModalReturnType = {
  displayName: string;
  Title: typeof ModalTitle;
  Description: typeof ModalDescription;
  Buttons: typeof ModalButtons;
};
