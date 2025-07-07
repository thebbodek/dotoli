import { createContext, PropsWithChildren, useContext } from 'react';

import {
  TAB_SIZES,
  TAB_THEMES,
  TAB_VARIANTS,
} from '@/components/Tab/constants';
import { TabContextProps, TabProviderProps } from '@/components/Tab/types';

const TabContext = createContext<TabContextProps | undefined>(undefined);

export const TabProvider = ({
  currentValue,
  tabRefs,
  variant = TAB_VARIANTS.LINE,
  theme = TAB_THEMES.GRAY,
  size = TAB_SIZES.MD,
  full = false,
  disabled = false,
  usePanel = false,
  children,
}: PropsWithChildren<TabProviderProps>) => {
  return (
    <TabContext.Provider
      value={{
        currentValue,
        tabRefs,
        variant,
        theme,
        size,
        full,
        disabled,
        usePanel,
      }}
    >
      {children}
    </TabContext.Provider>
  );
};

export const useTabContext = () => {
  const context = useContext(TabContext);

  if (!context) {
    throw new Error('useTabContext must be used within a TabContext');
  }

  return context;
};
