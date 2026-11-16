import { PropsWithChildren } from 'react';

import { TabPanelProps } from '@/components/Tab/types';
import { generateTabItemId, generateTabPanelId } from '@/components/Tab/utils';

const TabPanel = ({
  tabId,
  value,
  className,
  children,
}: PropsWithChildren<TabPanelProps>) => {
  return (
    <div
      aria-labelledby={generateTabItemId({ tabId, value })}
      className={className}
      id={generateTabPanelId({ tabId, value })}
      role='tabpanel'
      tabIndex={0}
    >
      {children}
    </div>
  );
};

export default TabPanel;
