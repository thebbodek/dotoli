import { createContext, PropsWithChildren, useContext } from 'react';

import {
  FormRepeaterListContextProps,
  FormRepeaterListProviderProps,
} from '@/components/FormRepeater/context/types';

const FormRepeaterListContext = createContext<
  FormRepeaterListContextProps | undefined
>(undefined);

export const FormRepeaterListProvider = ({
  itemsCount,
  children,
}: PropsWithChildren<FormRepeaterListProviderProps>) => {
  return (
    <FormRepeaterListContext.Provider value={{ itemsCount }}>
      {children}
    </FormRepeaterListContext.Provider>
  );
};

export const useFormRepeaterListContext = () => {
  const context = useContext(FormRepeaterListContext);

  if (!context) {
    throw new Error(
      'useFormRepeaterListContext must be used within a FormRepeaterListContext',
    );
  }

  return context;
};
