import { PropsWithChildren, useRef } from 'react';

import { TabProvider } from '@/components/Tab/context';
import Tab from '@/components/Tab/Tab';
import TabIndicator from '@/components/Tab/TabIndicator';
import TabListBase from '@/components/Tab/TabListBase';
import TabNumber from '@/components/Tab/TabNumber';
import { TabItemRefs, TabsProps } from '@/components/Tab/types';

const Tabs = ({
  currentValue,
  ariaLabel,
  variant,
  theme,
  size,
  disabled,
  full,
  children,
  className,
}: PropsWithChildren<TabsProps>) => {
  const tabRefs: TabItemRefs = useRef({});

  return (
    <TabProvider
      currentValue={currentValue}
      tabRefs={tabRefs}
      variant={variant}
      theme={theme}
      size={size}
      full={full}
      disabled={disabled}
      usePanel
    >
      <TabListBase ariaLabel={ariaLabel} className={className}>
        {children}
        <TabIndicator />
      </TabListBase>
    </TabProvider>
  );
};

export default Tabs;

Tabs.displayName = 'Tabs';
Tabs.Tab = Tab;
Tabs.Tab.Number = TabNumber;
