import {
  DialogHTMLAttributes,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from 'react';

import { PortalProps } from '@/components/Portal';
import {
  OVERLAY_CONTENT_WRAPPER_ELEMENTS,
  OVERLAY_VARIANTS,
} from '@/components/shared/components/Overlay/constants';
import { OverlayFooterPrimitiveProps } from '@/components/shared/components/Overlay/OverlayFooter';
import { ComponentPropsRef } from '@/components/shared/types';
import { TYPOGRAPHY_ELEMENTS, TypographyProps } from '@/components/Typography';
import { TypographyVariants } from '@/variants';

export type OverlayVariant =
  (typeof OVERLAY_VARIANTS)[keyof typeof OVERLAY_VARIANTS];

export interface OverlayProps
  extends Pick<PortalProps, 'target'>,
    Pick<DialogHTMLAttributes<HTMLDialogElement>, 'className'>,
    ComponentPropsRef<HTMLDialogElement> {
  variant: OverlayVariant;
  isOpen: boolean;
  dimmed?: boolean;
}

export interface OverlayHeaderProps
  extends Pick<HTMLAttributes<HTMLElement>, 'className'> {}

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

export interface OverlayBasePrimitiveProps
  extends Pick<OverlayProps, 'isOpen' | 'ref' | 'className'> {}

export interface OverlayPrimitiveProps
  extends PropsWithChildren,
    Omit<OverlayBasePrimitiveProps, 'className'>,
    Pick<HTMLAttributes<HTMLDivElement>, 'className'>,
    OverlayFooterPrimitiveProps,
    Pick<OverlayTitleProps, 'title'> {
  isLoading?: boolean;
}

export interface OverlayDividerProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {}

export type OverlayContentWrapperElements =
  (typeof OVERLAY_CONTENT_WRAPPER_ELEMENTS)[keyof typeof OVERLAY_CONTENT_WRAPPER_ELEMENTS];

export interface OverlayContentWrapperProps
  extends Pick<HTMLAttributes<HTMLElement>, 'className'> {
  as?: OverlayContentWrapperElements;
  isLoading?: boolean;
}
