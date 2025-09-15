import { createContext, PropsWithChildren, useContext } from 'react';

import {
  FormRepeaterContextProps,
  FormRepeaterProviderProps,
} from '@/components/FormRepeater/context/types';

const FormRepeaterContext = createContext<FormRepeaterContextProps | undefined>(
  undefined,
);

export const FormRepeaterContextProvider = ({
  listRef: bodyRef,
  columns,
  disabled,
  children,
}: PropsWithChildren<FormRepeaterProviderProps>) => {
  return (
    <FormRepeaterContext.Provider
      value={{ listRef: bodyRef, columns, disabled }}
    >
      {children}
    </FormRepeaterContext.Provider>
  );
};

export const useFormRepeaterContext = () => {
  const context = useContext(FormRepeaterContext);

  if (!context) {
    throw new Error(
      'useFormRepeaterContext must be used within a FormRepeaterContext',
    );
  }

  return context;
};
