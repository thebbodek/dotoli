import {
  CSSProperties,
  Dispatch,
  HTMLAttributes,
  RefObject,
  SetStateAction,
} from 'react';

import {
  TAB_SIZES,
  TAB_THEMES,
  TAB_VARIANTS,
} from '@/components/Tab/constants';

export type TabVariant = (typeof TAB_VARIANTS)[keyof typeof TAB_VARIANTS];

export type TabTheme = (typeof TAB_THEMES)[keyof typeof TAB_THEMES];

export type TabSize = (typeof TAB_SIZES)[keyof typeof TAB_SIZES];

export type TabItemRef = Record<string, HTMLButtonElement | null>;

export interface TabContextProps {
  currentValue: string;
  tabRefs: RefObject<TabItemRef>;
}

export interface TabProviderProps extends TabContextProps {}

export interface TabItem {
  label: string;
  value: TabContextProps['currentValue'];
  number?: number;
  disabled?: boolean;
}

export interface TabProps
  extends TabContextProps,
    Pick<HTMLAttributes<HTMLDivElement>, 'className'>,
    Pick<TabItem, 'disabled'> {
  items: TabItem[];
  variant?: TabVariant;
  theme?: TabTheme;
  size?: TabSize;
  ariaLabel?: HTMLAttributes<HTMLDivElement>['aria-label'];
  full?: boolean;
  onChange: (props: Pick<TabItem, 'value'>) => void;
}

export interface TabItemProps
  extends TabItem,
    Pick<TabProps, 'currentValue' | 'onChange' | 'tabRefs'>,
    Pick<Required<TabProps>, 'size' | 'theme' | 'variant' | 'full'> {}

export interface TabNumberProps
  extends Pick<TabItemProps, 'number' | 'theme' | 'variant'> {}

export interface TabIndicatorProps
  extends Pick<Required<TabProps>, 'variant' | 'theme' | 'currentValue'>,
    Pick<TabItemProps, 'tabRefs'> {}

export interface UseTabIndicatorStyleProps
  extends Pick<TabIndicatorProps, 'currentValue' | 'tabRefs'> {
  setStyle: Dispatch<SetStateAction<CSSProperties>>;
}

export interface TabPanelProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'>,
    Pick<TabItem, 'value'> {}

export interface UseTabPanelIdEffectProps extends Pick<TabPanelProps, 'value'> {
  setTabId: Dispatch<SetStateAction<HTMLAttributes<HTMLButtonElement>['id']>>;
}
