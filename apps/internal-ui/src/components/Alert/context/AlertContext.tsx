import { createContext, PropsWithChildren, useContext } from 'react';

import {
  AlertContextProps,
  AlertProviderProps,
} from '@/components/Alert/types';

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const AlertProvider = ({
  useTitle,
  theme,
  collapsible,
  buttonOption,
  useClose,
  collapsed,
  setCollapsed,
  setVisible,
  children,
}: PropsWithChildren<AlertProviderProps>) => {
  return (
    <AlertContext.Provider
      value={{
        useTitle,
        theme,
        collapsible,
        buttonOption,
        useClose,
        collapsed,
        setCollapsed,
        setVisible,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error('useAlertContext must be used within a AlertContext');
  }

  return context;
};
