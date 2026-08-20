import { HTMLAttributes } from 'react';

import { CtaButtonProps } from '@/components/Button';
import { CONFIRM_MODAL_TITLE_ELEMENTS } from '@/components/ConfirmModal/constants';
import { OverlayProps } from '@/components/shared/Overlay/types';

export type ConfirmModalTitleElement =
  (typeof CONFIRM_MODAL_TITLE_ELEMENTS)[keyof typeof CONFIRM_MODAL_TITLE_ELEMENTS];

export interface ConfirmModalAction
  extends Required<Pick<CtaButtonProps, 'label' | 'onClick'>> {}

export interface ConfirmModalProps
  extends Pick<OverlayProps, 'isOpen' | 'target' | 'onClose'>,
    Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  title: string;
  titleAs?: ConfirmModalTitleElement;
  description: string;
  confirm: ConfirmModalAction;
  cancel?: ConfirmModalAction;
}
