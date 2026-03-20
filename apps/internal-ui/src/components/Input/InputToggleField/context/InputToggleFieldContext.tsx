import { createContext, PropsWithChildren, useContext } from 'react';

import { InputToggleFieldContextValue } from '@/components/Input/InputToggleField/types';

const createInputToggleFieldContext = () =>
  createContext<InputToggleFieldContextValue | undefined>(undefined);

const InputToggleFieldContext = createInputToggleFieldContext();

export const InputToggleFieldProvider = ({
  size,
  checked,
  children,
}: PropsWithChildren<InputToggleFieldContextValue>) => {
  return (
    <InputToggleFieldContext.Provider value={{ size, checked }}>
      {children}
    </InputToggleFieldContext.Provider>
  );
};

export const useInputToggleFieldContext = () => {
  const context = useContext(InputToggleFieldContext);

  if (!context) {
    throw new Error(
      'useInputToggleFieldContext must be used within a InputToggleFieldContext',
    );
  }

  return context;
};
