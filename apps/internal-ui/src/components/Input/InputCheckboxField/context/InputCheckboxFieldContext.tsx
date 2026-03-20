import { createContext, PropsWithChildren, useContext } from 'react';

import { InputCheckboxFieldContextValue } from '@/components/Input/InputCheckboxField/types';

const createInputCheckboxFieldContext = <T extends string>() =>
  createContext<InputCheckboxFieldContextValue<T> | undefined>(undefined);

const InputCheckboxFieldContext = createInputCheckboxFieldContext();

export const InputCheckboxFieldProvider = <T extends string>({
  name,
  values,
  size,
  children,
}: PropsWithChildren<InputCheckboxFieldContextValue<T>>) => {
  return (
    <InputCheckboxFieldContext.Provider value={{ name, values, size }}>
      {children}
    </InputCheckboxFieldContext.Provider>
  );
};

export const useInputCheckboxFieldContext = <T extends string>() => {
  const context = useContext(InputCheckboxFieldContext);

  if (!context) {
    throw new Error(
      'useInputCheckboxFieldContext must be used within a InputCheckboxFieldContext',
    );
  }

  return context as unknown as InputCheckboxFieldContextValue<T>;
};
