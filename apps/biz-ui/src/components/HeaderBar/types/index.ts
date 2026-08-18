import { ButtonHTMLAttributes, HTMLAttributes } from 'react';

import {
  ButtonIconOption,
  ButtonIconPosition,
} from '@/components/Button/shared/types';
import {
  HEADER_BAR_THEMES,
  HEADER_BAR_TYPES,
} from '@/components/HeaderBar/constants';
import { ColorVariants } from '@/variants';

export type HeaderBarType =
  (typeof HEADER_BAR_TYPES)[keyof typeof HEADER_BAR_TYPES];

export type HeaderBarTheme =
  (typeof HEADER_BAR_THEMES)[keyof typeof HEADER_BAR_THEMES];

export interface HeaderBarThemeStyles {
  CONTAINER: string;
  TITLE: ColorVariants;
  CARET: string;
  NOTIFICATION_ICON: string;
}

export interface HeaderBarProgressOption {
  currentStep: number;
  totalSteps: number;
}

export interface HeaderBarProps
  extends Pick<HTMLAttributes<HTMLElement>, 'className'> {
  title: string;
  type?: HeaderBarType;
  theme?: HeaderBarTheme;
  hasUnreadNotification?: boolean;
  progressOption?: HeaderBarProgressOption;
  onTitleClick?: () => void;
  onNotificationClick?: () => void;
  onBack?: () => void;
  onClose?: () => void;
}

export interface HeaderBarHomeTitleProps
  extends Pick<HeaderBarProps, 'title' | 'onTitleClick'>,
    Required<Pick<HeaderBarProps, 'theme'>> {}

export interface HeaderBarNotificationButtonProps
  extends Required<Pick<HeaderBarProps, 'theme' | 'hasUnreadNotification'>>,
    Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {}

export interface HeaderBarNavigationButtonProps
  extends Pick<ButtonIconOption, 'iconKey'>,
    Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  label: string;
  iconPosition: ButtonIconPosition;
}
