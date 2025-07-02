import { HTMLAttributes, PropsWithChildren, useState } from 'react';

import { useTabPanelContext } from '@/components/Tab/context/TabContext';
import useTabPanelIdEffect from '@/components/Tab/hooks/effects/useTabPanelIdEffect';
import { TabPanelProps } from '@/components/Tab/types';
import { getPanelId } from '@/components/Tab/utils/getPanelId';

const TabPanel = ({
  children,
  value,
  className,
}: PropsWithChildren<TabPanelProps>) => {
  const { currentValue } = useTabPanelContext();
  const [tabId, setTabId] = useState<HTMLAttributes<HTMLButtonElement>['id']>();
  const id = getPanelId({ id: tabId });

  useTabPanelIdEffect({ value, setTabId });

  return (
    <div
      role='tabpanel'
      id={id}
      aria-labelledby={tabId}
      hidden={currentValue !== value}
      className={className}
    >
      {children}
    </div>
  );
};

export default TabPanel;
