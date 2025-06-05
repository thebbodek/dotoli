import {
  SelectLabelContextValue,
  SelectLabelProviderProps,
} from '@/components/Select/shared/types';
import { createContext, PropsWithChildren, useContext } from 'react';

const SelectLabelContext = createContext<SelectLabelContextValue | undefined>(
  undefined,
);

export const SelectLabelProvider = ({
  id,
  required,
  children,
}: PropsWithChildren<SelectLabelProviderProps>) => {
  return (
    <SelectLabelContext.Provider value={{ id, required }}>
      {children}
    </SelectLabelContext.Provider>
  );
};

export const useSelectLabelContext = () => {
  const context = useContext(SelectLabelContext);

  if (!context) {
    throw new Error(
      'useSelectLabelContext must be used within a SelectLabelContext',
    );
  }

  return context;
};
