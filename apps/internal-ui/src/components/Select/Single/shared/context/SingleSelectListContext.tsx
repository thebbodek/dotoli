import { createContext, PropsWithChildren, useContext } from 'react';

import {
  SelectValue,
  SingleSelectListContextValue,
  SingleSelectListProviderProps,
} from '@/components/Select/Single/shared/types';

const createSelectListContext = () =>
  createContext<SingleSelectListContextValue<SelectValue> | undefined>(
    undefined,
  );

const SingleSelectListContext = createSelectListContext();

export const SingleSelectListProvider = <T extends SelectValue>({
  id,
  labelId,
  close,
  value,
  onSelect,
  children,
}: PropsWithChildren<SingleSelectListProviderProps<T>>) => {
  const contextValue = {
    id,
    labelId,
    close,
    value,
    onSelect,
  } as SingleSelectListContextValue<SelectValue>;

  return (
    <SingleSelectListContext.Provider value={contextValue}>
      {children}
    </SingleSelectListContext.Provider>
  );
};

export const useSingleSelectListContext = <T extends SelectValue>() => {
  const context = useContext(SingleSelectListContext);

  if (!context) {
    throw new Error(
      'useSingleSelectListContext must be used within a SingleSelectListContext',
    );
  }

  return context as unknown as SingleSelectListContextValue<T>;
};
