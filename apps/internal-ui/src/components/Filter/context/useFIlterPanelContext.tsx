import { createContext, PropsWithChildren, useContext, useState } from 'react';

import { FILTER_STEPS } from '@/components/Filter/constants';
import { FilterPanelContextValue, FilterStep } from '@/components/Filter/types';

const FilterPanelContext = createContext<FilterPanelContextValue | undefined>(
  undefined,
);

export const FilterPanelProvider = ({ children }: PropsWithChildren) => {
  const [filterStep, setFilterStep] = useState<FilterStep>(FILTER_STEPS.IDLE);
  const [currentOptions, setCurrentOptions] =
    useState<FilterPanelContextValue['currentOptions']>(null);
  const [currentSelectValue, setCurrentSelectValue] =
    useState<FilterPanelContextValue['currentSelectValue']>(null);

  const contextValue = {
    filterStep,
    setFilterStep,
    currentOptions,
    setCurrentOptions,
    currentSelectValue,
    setCurrentSelectValue,
  } as FilterPanelContextValue;

  return (
    <FilterPanelContext.Provider value={contextValue}>
      {children}
    </FilterPanelContext.Provider>
  );
};

export const useFilterPanelContext = () => {
  const context = useContext(FilterPanelContext);

  if (!context) {
    throw new Error(
      'useFilterPanelContext must be used within a FilterPanelProvider',
    );
  }

  return context;
};
