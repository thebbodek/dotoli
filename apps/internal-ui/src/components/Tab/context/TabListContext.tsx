import { createContext, PropsWithChildren, useContext } from 'react';

import {
  TabListContextProps,
  TabListProviderProps,
} from '@/components/Tab/types';

const TabListContext = createContext<TabListContextProps | undefined>(
  undefined,
);

export const TabListProvider = ({
  currentValue,
  tabRefs,
  children,
}: PropsWithChildren<TabListProviderProps>) => {
  return (
    <TabListContext.Provider value={{ currentValue, tabRefs }}>
      {children}
    </TabListContext.Provider>
  );
};

export const useTabListContext = () => {
  const context = useContext(TabListContext);

  if (!context) {
    throw new Error('useTabListContext must be used within a TabListContext');
  }

  return context;
};
