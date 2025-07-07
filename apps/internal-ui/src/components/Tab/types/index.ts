import {
  ButtonHTMLAttributes,
  CSSProperties,
  Dispatch,
  HTMLAttributes,
  SetStateAction,
} from 'react';

import {
  TAB_SIZES,
  TAB_THEMES,
  TAB_VARIANTS,
} from '@/components/Tab/constants';
import { KeydownFocusControlItemRefs } from '@/components/shared/utils/handleKeyDownFocus/types';

export type TabVariant = (typeof TAB_VARIANTS)[keyof typeof TAB_VARIANTS];

export type TabTheme = (typeof TAB_THEMES)[keyof typeof TAB_THEMES];

export type TabSize = (typeof TAB_SIZES)[keyof typeof TAB_SIZES];

export type TabItemRefs = KeydownFocusControlItemRefs<HTMLButtonElement>;

export interface TabProviderProps {
  variant?: TabVariant;
  theme?: TabTheme;
  size?: TabSize;
  full?: boolean;
  disabled?: TabProps['disabled'];
  currentValue: TabProps['value'];
  tabRefs: TabItemRefs;
  usePanel?: boolean;
}

export interface TabContextProps extends Required<TabProviderProps> {}

export interface TabListContextProps
  extends Pick<TabContextProps, 'currentValue' | 'tabRefs'> {}

export interface TabListProviderProps extends TabListContextProps {}

export interface TabListBaseProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  ariaLabel?: HTMLAttributes<HTMLDivElement>['aria-label'];
}

export interface TabsProps
  extends Omit<TabContextProps, 'usePanel' | 'tabRefs'>,
    TabListBaseProps {}

export interface TabListProps
  extends Omit<TabsProps, keyof TabListContextProps> {}

export interface TabProps
  extends Pick<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'disabled' | 'onChange'
  > {
  value: string;
}

export interface UseTabIndicatorStyleProps {
  setStyle: Dispatch<SetStateAction<CSSProperties>>;
}

export interface TabPanelProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'>,
    Pick<TabProps, 'value'> {}

export interface UseTabPanelIdEffectProps extends Pick<TabPanelProps, 'value'> {
  setTabId: Dispatch<SetStateAction<HTMLAttributes<HTMLButtonElement>['id']>>;
}
