import { HTMLAttributes } from 'react';

import { TAB_ITEM_STATES, TAB_VARIANTS } from '@/components/Tab/constants';

export type TabVariant = (typeof TAB_VARIANTS)[keyof typeof TAB_VARIANTS];

export type TabItemState =
  (typeof TAB_ITEM_STATES)[keyof typeof TAB_ITEM_STATES];

export interface TabVariantStyles {
  LIST: string;
  ITEM: string;
  STATES: Record<TabItemState, string>;
}

export interface TabItemOption {
  value: string;
  label: string;
}

export interface TabProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className' | 'aria-label'>,
    Required<Pick<HTMLAttributes<HTMLDivElement>, 'id'>> {
  items: TabItemOption[];
  value: string;
  variant?: TabVariant;
  onChange: (value: string) => void;
}

export interface TabIdentity extends Pick<TabItemOption, 'value'> {
  tabId: TabProps['id'];
}

export interface TabItemProps
  extends TabItemOption,
    TabIdentity,
    Pick<TabProps, 'onChange'>,
    Required<Pick<TabProps, 'variant'>> {
  isSelected: boolean;
}

export interface TabPanelProps
  extends TabIdentity,
    Pick<HTMLAttributes<HTMLDivElement>, 'className'> {}

export interface GenerateTabIdProps extends TabIdentity {}
