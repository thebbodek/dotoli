import { createContext, PropsWithChildren, useContext } from 'react';

import {
  SelectTriggerContextValue,
  SelectTriggerProviderProps,
} from '@/components/Select/shared/types';

const SelectTriggerContext = createContext<
  SelectTriggerContextValue | undefined
>(undefined);

export const SelectTriggerProvider = ({
  ref,
  isOpen,
  onToggle,
  disabled,
  isError,
  children,
}: PropsWithChildren<SelectTriggerProviderProps>) => {
  return (
    <SelectTriggerContext.Provider
      value={{ ref, isOpen, onToggle, disabled, isError }}
    >
      {children}
    </SelectTriggerContext.Provider>
  );
};

export const useSelectTriggerContext = () => {
  const context = useContext(SelectTriggerContext);

  if (!context) {
    throw new Error(
      'useSelectTriggerContext must be used within a SelectTriggerContext',
    );
  }

  return context;
};
