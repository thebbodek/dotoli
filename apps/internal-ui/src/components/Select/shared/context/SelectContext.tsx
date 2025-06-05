import { createContext, PropsWithChildren, useContext, useState } from 'react';

import { SelectProviderValue } from '@/components/Select/shared/types';

const SelectContext = createContext<SelectProviderValue | undefined>(undefined);

export const SelectProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SelectContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SelectContext.Provider>
  );
};

export const useSelectContext = () => {
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error('useSelectContext must be used within a SelectProvider');
  }

  return context;
};
