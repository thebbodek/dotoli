import { Dispatch, HTMLAttributes, ReactNode, SetStateAction } from 'react';

import { ALERT_THEMES } from '@/components/Alert/constants';
import { IconProps } from '@/components/Icon';
import { ActionButtonProps } from '@/components/shared';

export type AlertTheme = (typeof ALERT_THEMES)[keyof typeof ALERT_THEMES];

export interface AlertProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  content: ReactNode;
  title?: ReactNode;
  theme?: AlertTheme;
  collapsible?: boolean;
  useClose?: boolean;
  actionOption?: Partial<
    Pick<
      ActionButtonProps,
      'as' | 'buttonOption' | 'disabled' | 'label' | 'linkOption' | 'responsive'
    >
  >;
  iconOption?: Pick<IconProps, 'iconKey'>;
}

export interface AlertContextProps
  extends Required<Pick<AlertProps, 'theme' | 'collapsible' | 'useClose'>>,
    Pick<AlertProps, 'actionOption'> {
  hasTitle: boolean;
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export interface AlertProviderProps extends AlertContextProps {}

export interface AlertBoxProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {}

export interface AlertHeadingProps extends Pick<AlertProps, 'iconOption'> {
  heading?: ReactNode;
}

export interface AlertIconProps extends Pick<AlertHeadingProps, 'iconOption'> {}

export interface AlertDescriptionProps {
  description: ReactNode;
}

export interface AlertActionButtonProps
  extends Pick<ActionButtonProps, 'className'> {}
