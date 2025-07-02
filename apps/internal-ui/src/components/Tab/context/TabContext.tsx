import { createContext, PropsWithChildren, useContext } from 'react';

import { TabContextProps, TabProviderProps } from '@/components/Tab/types';

const TabContext = createContext<TabContextProps | undefined>(undefined);

export const TabProvider = ({
  currentValue,
  tabRefs,
  children,
}: PropsWithChildren<TabProviderProps>) => {
  return (
    <TabContext.Provider value={{ currentValue, tabRefs }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTabContext = () => {
  const context = useContext(TabContext);

  return context;
};

export const useTabPanelContext = () => {
  const context = useTabContext();

  if (!context) {
    throw new Error('useTabPanelContext must be used within a TabContext');
  }

  return context;
};

export default TabContext;
