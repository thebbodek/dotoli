import { HTMLAttributes, PropsWithChildren, useState } from 'react';

import { useTabListContext } from '@/components/Tab/context/TabListContext';
import useTabPanelIdEffect from '@/components/Tab/hooks/effects/useTabPanelIdEffect';
import { TabPanelProps } from '@/components/Tab/types';
import { getPanelId } from '@/components/Tab/utils/getPanelId';

const TabPanel = ({
  children,
  value,
  className,
}: PropsWithChildren<TabPanelProps>) => {
  const { currentValue } = useTabListContext();
  const [tabId, setTabId] = useState<HTMLAttributes<HTMLButtonElement>['id']>();
  const id = getPanelId({ id: tabId });

  useTabPanelIdEffect({ value, setTabId });

  return (
    <div
      role='tabpanel'
      id={id}
      aria-labelledby={tabId}
      tabIndex={0}
      hidden={currentValue !== value}
      className={className}
    >
      {children}
    </div>
  );
};

export default TabPanel;
