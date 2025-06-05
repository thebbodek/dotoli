import { UseClickOutsideProps } from '@bbodek/hooks';
import { DialogHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

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

export interface OverlayTitleProps
  extends Pick<
    TypographyProps<typeof TYPOGRAPHY_ELEMENTS.STRONG>,
    'className'
  > {
  title: ReactNode;
  variant?: Extract<TypographyVariants, 'headline-20-b' | 'headline-16-b'>;
}

export interface OverlayDescriptionProps
  extends Pick<TypographyProps<typeof TYPOGRAPHY_ELEMENTS.P>, 'className'> {
  description: ReactNode;
}

export interface OverlayFooterProps
  extends Pick<HTMLAttributes<HTMLElement>, 'className'> {
  onConfirm: () => void;
  onCancel?: () => void;
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
  className?: string;
  isFull?: boolean;
}
