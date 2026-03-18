import { createContext, PropsWithChildren, useContext } from 'react';

import {
  InputFieldBaseContextProps,
  InputFieldBaseProviderProps,
} from '@/components/Input/shared/types';

const InputFieldBaseContext = createContext<
  InputFieldBaseContextProps | undefined
>(undefined);

export const InputFieldBaseProvider = ({
  feedbackId,
  isError = false,
  disabled = false,
  children,
  onChange,
}: PropsWithChildren<InputFieldBaseProviderProps>) => {
  return (
    <InputFieldBaseContext.Provider
      value={{ feedbackId, isError, disabled, onChange }}
    >
      {children}
    </InputFieldBaseContext.Provider>
  );
};

export const useInputFieldBaseContext = () => {
  const context = useContext(InputFieldBaseContext);

  if (!context) {
    throw new Error(
      'useInputFieldBaseContext must be used within a InputFieldBaseContext',
    );
  }

  return context;
};

export default InputFieldBaseContext;
