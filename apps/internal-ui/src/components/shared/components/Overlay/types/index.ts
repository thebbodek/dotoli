import { UseClickOutsideProps } from '@bbodek/hooks';
import {
  DialogHTMLAttributes,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from 'react';

import { ButtonProps } from '@/components/Button';
import { PortalProps } from '@/components/Portal';
import { OVERLAY_VARIANTS } from '@/components/shared/components/Overlay/constants';
import { ComponentPropsRef } from '@/components/shared/types';
import { TYPOGRAPHY_ELEMENTS, TypographyProps } from '@/components/Typography';
import { TypographyVariants } from '@/variants';

export type OverlayVariant =
  (typeof OVERLAY_VARIANTS)[keyof typeof OVERLAY_VARIANTS];

export interface OverlayProps
  extends Pick<PortalProps, 'target'>,
    Pick<DialogHTMLAttributes<HTMLDialogElement>, 'className'>,
    ComponentPropsRef<HTMLDialogElement>,
    Partial<UseClickOutsideProps> {
  variant: OverlayVariant;
  isOpen: boolean;
  dimmed?: boolean;
}

export interface UseBodyScrollLockEffectProps {
  isLocked: boolean;
}

export interface OverlayTitleProps
  extends Pick<
    TypographyProps<typeof TYPOGRAPHY_ELEMENTS.STRONG>,
    'className'
  > {
  title: ReactNode;
  variant?: Extract<TypographyVariants, 'headline-20-b' | 'body-16-b'>;
}

export interface OverlayDescriptionProps
  extends Pick<TypographyProps<typeof TYPOGRAPHY_ELEMENTS.P>, 'className'> {
  description: ReactNode;
}

export interface OverlayFooterPrimitiveProps {
  onConfirm: () => void;
  onCancel?: () => void;
  confirmButtonLabel: string;
  cancelButtonLabel?: string;
}

export interface OverlayFooterStateProps
  extends Pick<ButtonProps, 'isPending'> {
  possibleConfirm?: boolean;
}

export interface OverlayFooterStyleProps
  extends Pick<HTMLAttributes<HTMLElement>, 'className'> {
  buttonSize?: ButtonProps['size'];
  isFull?: boolean;
}

export interface OverlayFooterProps
  extends OverlayFooterPrimitiveProps,
    OverlayFooterStateProps,
    OverlayFooterStyleProps {}

export interface OverlayBasePrimitiveProps
  extends Pick<OverlayProps, 'isOpen' | 'ref' | 'className'> {}

export interface OverlayPrimitiveProps
  extends PropsWithChildren,
    Omit<OverlayBasePrimitiveProps, 'className'>,
    Pick<HTMLAttributes<HTMLDivElement>, 'className'>,
    OverlayFooterPrimitiveProps,
    Pick<OverlayTitleProps, 'title'> {}

export interface OverlayDividerProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {}
