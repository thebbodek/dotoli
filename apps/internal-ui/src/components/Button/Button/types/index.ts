import { LinkProps } from 'next/link';
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ElementType,
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from 'react';

import {
  BUTTON_COLORS,
  BUTTON_ELEMENTS,
  BUTTON_SIZES,
  BUTTON_STATUS,
  BUTTON_VARIANTS,
} from '@/components/Button/Button/constants';
import { ComponentPropsRef } from '@/components/shared';

export type ButtonElements =
  (typeof BUTTON_ELEMENTS)[keyof typeof BUTTON_ELEMENTS];

export type ButtonElementType = Extract<ElementType, ButtonElements>;

export type ButtonVariants =
  (typeof BUTTON_VARIANTS)[keyof typeof BUTTON_VARIANTS];

export type ButtonColors = (typeof BUTTON_COLORS)[keyof typeof BUTTON_COLORS];

export type ButtonSizes = (typeof BUTTON_SIZES)[keyof typeof BUTTON_SIZES];

export type ButtonStatus = (typeof BUTTON_STATUS)[keyof typeof BUTTON_STATUS];

export type ButtonStyles = Record<ButtonStatus, string>;

export interface ButtonDefaultProps<T extends ButtonElementType>
  extends Pick<HTMLAttributes<T>, 'className' | 'title'>,
    ComponentPropsRef<T> {
  as?: T;
  label: string;
  variant?: ButtonVariants;
  color?: ButtonColors;
  size?: ButtonSizes;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
}

export type ButtonProps<T extends ButtonElementType> =
  T extends typeof BUTTON_ELEMENTS.BUTTON
    ? ButtonDefaultProps<T> &
        Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> &
        ComponentPropsRef<HTMLButtonElement>
    : ButtonDefaultProps<T> &
        Omit<LinkProps, keyof ButtonDefaultProps<T> | 'onClick'> &
        Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'target'> &
        ComponentPropsRef<HTMLAnchorElement>;

export interface UseButtonRenderErrorEffectProps<T extends ButtonElementType>
  extends Required<Pick<ButtonDefaultProps<T>, 'variant' | 'color' | 'size'>> {}
