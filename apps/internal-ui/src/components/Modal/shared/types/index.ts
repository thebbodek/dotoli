import { HTMLAttributes, ReactNode } from 'react';

import ModalDescription from '@/components/Modal/shared/ModalDescription';
import ModalButtons from '@/components/Modal/shared/ModalFooter';
import ModalTitle from '@/components/Modal/shared/ModalTitle';
import { TYPOGRAPHY_ELEMENTS, TypographyProps } from '@/components/Typography';
import { OverlayProps } from '@/components/shared/types';

export interface ModalProps
  extends Pick<OverlayProps, 'isOpen' | 'ref' | 'className'> {}

export interface ModalPrimitiveProps extends ModalProps {
  title: ReactNode;
  description: ReactNode;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
}

export interface ModalTitleProps
  extends Pick<ModalPrimitiveProps, 'title'>,
    Pick<TypographyProps<typeof TYPOGRAPHY_ELEMENTS.STRONG>, 'className'> {}

export interface ModalDescriptionProps
  extends Pick<ModalPrimitiveProps, 'description'>,
    Pick<TypographyProps<typeof TYPOGRAPHY_ELEMENTS.P>, 'className'> {}

export interface ModalFooterProps
  extends Pick<
      ModalPrimitiveProps,
      'onConfirm' | 'onCancel' | 'confirmButtonLabel' | 'cancelButtonLabel'
    >,
    Pick<HTMLAttributes<HTMLDivElement>, 'className'> {}

export type ModalReturnType = {
  displayName: string;
  Title: typeof ModalTitle;
  Description: typeof ModalDescription;
  Buttons: typeof ModalButtons;
};
