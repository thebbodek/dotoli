import { createContext, PropsWithChildren, useContext, useId } from 'react';

import {
  MultiSelectContextValue,
  MultiSelectProviderProps,
  MultiSelectValue,
} from '@/components/Select/Multi/MultiSelect/types';

function createMultiSelectContext<T extends MultiSelectValue>() {
  return createContext<MultiSelectContextValue<T> | undefined>(undefined);
}

const MultiSelectContext = createMultiSelectContext<MultiSelectValue>();

export const MultiSelectProvider = <T extends MultiSelectValue>({
  onRemove,
  onSelect,
  onAllSelect,
  selectedValues,
  children,
}: PropsWithChildren<MultiSelectProviderProps<T>>) => {
  const selectListResultId = useId();
  const selectedListResultId = useId();

  const contextValue = {
    onRemove,
    onSelect,
    onAllSelect,
    selectedValues,
    selectListResultId,
    selectedListResultId,
  };

  return (
    <MultiSelectContext.Provider
      value={
        contextValue as unknown as MultiSelectContextValue<MultiSelectValue>
      }
    >
      {children}
    </MultiSelectContext.Provider>
  );
};

export const useMultiSelectContext = <T extends MultiSelectValue>() => {
  const context = useContext(MultiSelectContext);

  if (!context) {
    throw new Error(
      'useMultiSelectContext must be used within a MultiSelectContext',
    );
  }

  return context as unknown as MultiSelectContextValue<T>;
};
