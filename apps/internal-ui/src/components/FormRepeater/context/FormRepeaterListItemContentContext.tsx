import { createContext, PropsWithChildren, useContext } from 'react';

import {
  FormRepeaterListItemContentContextProps,
  FormRepeaterListItemContentProviderProps,
} from '@/components/FormRepeater/context/types';

const FormRepeaterListItemContentContext = createContext<
  FormRepeaterListItemContentContextProps | undefined
>(undefined);

export const FormRepeaterListItemContentProvider = ({
  column,
  children,
}: PropsWithChildren<FormRepeaterListItemContentProviderProps>) => {
  return (
    <FormRepeaterListItemContentContext.Provider value={{ column }}>
      {children}
    </FormRepeaterListItemContentContext.Provider>
  );
};

export const useFormRepeaterListItemContentContext = () => {
  const context = useContext(FormRepeaterListItemContentContext);

  if (!context) {
    throw new Error(
      'useFormRepeaterListItemContentContext must be used within a FormRepeaterListItemContentContext',
    );
  }

  return context;
};
