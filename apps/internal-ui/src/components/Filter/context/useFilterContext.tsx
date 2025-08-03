import { createContext, PropsWithChildren, useContext } from 'react';

import {
  FilterContextProviderProps,
  FilterContextValue,
} from '@/components/Filter/types';

const FilterContext = createContext<FilterContextValue | undefined>(undefined);

export const FilterProvider = ({
  toggleValues,
  toggleOptions,
  selectValues,
  selectOptions,
  children,
  onChange,
}: PropsWithChildren<FilterContextProviderProps>) => {
  const contextValue = {
    toggleValues,
    toggleOptions,
    selectValues,
    selectOptions,
    onChange,
  } as FilterContextValue;

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const context = useContext(FilterContext);

  if (!context) {
    throw new Error('useFilterContext must be used within a FilterProvider');
  }

  return context;
};
