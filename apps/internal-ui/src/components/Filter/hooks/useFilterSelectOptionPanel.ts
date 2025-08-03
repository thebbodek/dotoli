import { useCallback } from 'react';

import { FILTER_STEPS } from '@/components/Filter/constants';
import { useFilterContext } from '@/components/Filter/context';
import { useFilterPanelContext } from '@/components/Filter/context/useFilterPanelContext';
import { FilterSelectOption } from '@/components/Filter/types';

const useFilterSelectOptionPanel = () => {
  const {
    toggleValues = null,
    selectValues,
    selectOptions,
    onChange,
  } = useFilterContext();
  const {
    currentOptions,
    currentSelectValue,
    setCurrentSelectValue,
    setFilterStep,
  } = useFilterPanelContext();
  const { key } = currentOptions!;
  const selectValue = selectValues?.[key] ?? null;
  const _currentSelectValue = currentSelectValue?.[key] ?? null;
  const value = selectValue ?? _currentSelectValue;
  const options = selectOptions.find((option) => option.key === key);

  const handleChange = useCallback(
    ({ value }: { value: FilterSelectOption['value'][] | null }) => {
      onChange({
        toggleValues,
        selectValues: {
          ...selectValues,
          [key]: value,
        },
      });
      setFilterStep(FILTER_STEPS.IDLE);
      setCurrentSelectValue(null);
    },
    [key, currentSelectValue, selectValues],
  );

  return {
    models: {
      value,
      options,
    },
    operations: { handleChange, setCurrentSelectValue },
  };
};

export default useFilterSelectOptionPanel;
