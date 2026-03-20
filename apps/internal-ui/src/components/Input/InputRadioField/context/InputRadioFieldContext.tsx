import { createContext, PropsWithChildren, useContext } from 'react';

import { InputRadioFieldContextValue } from '@/components/Input/InputRadioField/types';

const createInputRadioFieldContext = <T extends string>() =>
  createContext<InputRadioFieldContextValue<T> | undefined>(undefined);

const InputRadioFieldContext = createInputRadioFieldContext();

export const InputRadioFieldProvider = <T extends string>({
  name,
  value,
  size,
  children,
}: PropsWithChildren<InputRadioFieldContextValue<T>>) => {
  return (
    <InputRadioFieldContext.Provider value={{ name, value, size }}>
      {children}
    </InputRadioFieldContext.Provider>
  );
};

export const useInputRadioFieldContext = <T extends string>() => {
  const context = useContext(InputRadioFieldContext);

  if (!context) {
    throw new Error(
      'useInputRadioFieldContext must be used within a InputRadioFieldContext',
    );
  }

  return context as unknown as InputRadioFieldContextValue<T>;
};
