import { PropsWithChildren } from 'react';

import { TabProvider } from '@/components/Tab/context';
import { useTabListContext } from '@/components/Tab/context/TabListContext';
import Tab from '@/components/Tab/Tab';
import TabIndicator from '@/components/Tab/TabIndicator';
import TabListBase from '@/components/Tab/TabListBase';
import TabPanel from '@/components/Tab/TabPanel';
import { TabListProps } from '@/components/Tab/types';

const TabList = ({
  'aria-label': ariaLabel,
  variant,
  theme,
  size,
  disabled,
  full,
  children,
  className,
}: PropsWithChildren<TabListProps>) => {
  const { currentValue, tabRefs } = useTabListContext();

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
      <TabListBase aria-label={ariaLabel} className={className}>
        {children}
        <TabIndicator />
      </TabListBase>
    </TabProvider>
  );
};

export default TabList;

TabList.displayName = 'TabList';
TabList.Tab = Tab;
TabList.Panel = TabPanel;
