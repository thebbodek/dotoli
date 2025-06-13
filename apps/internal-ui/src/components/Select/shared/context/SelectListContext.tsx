import { createContext, PropsWithChildren, useContext } from 'react';

import {
  SelectListContextValue,
  SelectListProviderProps,
} from '@/components/Select/shared/types';

const SelectListContext = createContext<SelectListContextValue | undefined>(
  undefined,
);

export const SelectListProvider = ({
  id,
  labelId,
  onPopoverClose,
  children,
}: PropsWithChildren<SelectListProviderProps>) => {
  return (
    <SelectListContext.Provider value={{ id, labelId, onPopoverClose }}>
      {children}
    </SelectListContext.Provider>
  );
};

export const useSelectListContext = () => {
  const context = useContext(SelectListContext);

  if (!context) {
    throw new Error(
      'useSelectListContext must be used within a SelectListContext',
    );
  }

  return context;
};
