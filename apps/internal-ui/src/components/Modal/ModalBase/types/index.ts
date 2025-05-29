import { DialogHTMLAttributes } from 'react';

import { MODAL_VARIANTS } from '@/components/Modal/ModalBase/constants';
import { PortalProps } from '@/components/Portal';
import { ComponentPropsRef } from '@/components/shared';

export type ModalVariantsType =
  (typeof MODAL_VARIANTS)[keyof typeof MODAL_VARIANTS];

export interface ModalBaseProps
  extends Pick<PortalProps, 'target'>,
    Pick<DialogHTMLAttributes<HTMLDialogElement>, 'className'>,
    ComponentPropsRef<HTMLDialogElement> {
  variant: ModalVariantsType;
  isOpen: boolean;
  dimmed?: boolean;
}
