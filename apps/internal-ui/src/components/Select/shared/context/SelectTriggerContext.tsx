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
  disabled = false,
  isError = false,
  children,
  placeholder = '선택해주세요',
}: PropsWithChildren<SelectTriggerProviderProps>) => {
  const contextValue = {
    ref,
    isOpen,
    onToggle,
    disabled,
    isError,
    placeholder,
  };

  return (
    <SelectTriggerContext.Provider value={contextValue}>
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
