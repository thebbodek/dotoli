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
  isFull,
  children,
  className,
}: PropsWithChildren<TabListProps>) => {
  const { currentValue, tabRefs } = useTabListContext();

  return (
    <TabProvider
      currentValue={currentValue}
      disabled={disabled}
      isFull={isFull}
      size={size}
      tabRefs={tabRefs}
      theme={theme}
      variant={variant}
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
