import { createContext, PropsWithChildren, useContext } from 'react';

import {
  InputContextProps,
  InputProviderProps,
} from '@/components/Input/shared/types';

const InputContext = createContext<InputContextProps | undefined>(undefined);

export const InputProvider = ({
  feedbackId,
  isError = false,
  children,
}: PropsWithChildren<InputProviderProps>) => {
  return (
    <InputContext.Provider value={{ feedbackId, isError }}>
      {children}
    </InputContext.Provider>
  );
};

export const useInputContext = () => {
  const context = useContext(InputContext);

  if (!context) {
    throw new Error('useInputContext must be used within a InputContext');
  }

  return context;
};

export default InputContext;
