import { debounce } from 'lodash-es';
import {
  ChangeEvent,
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react';

import useMultiSelectBaseInitialOptionsEffect from '@/components/Select/Multi/shared/hooks/effects/useMultiSelectBaseInitialOptionsEffect';
import {
  MultiSelectBaseContextValue,
  MultiSelectBaseOnSearchParams,
  MultiSelectBaseProviderProps,
  MultiSelectBaseValue,
  MultiSelectInternalOption,
} from '@/components/Select/Multi/shared/types';
import { SelectBaseItemProps } from '@/components/Select/shared';

const createMultiSelectBaseContext = <T extends MultiSelectBaseValue>() =>
  createContext<MultiSelectBaseContextValue<T> | undefined>(undefined);

const MultiSelectBaseContext =
  createMultiSelectBaseContext<MultiSelectBaseValue>();

export const MultiSelectBaseProvider = <T extends MultiSelectBaseValue>({
  selectListResultId,
  selectedListResultId,
  children,
  value,
  onChange,
  options,
}: PropsWithChildren<MultiSelectBaseProviderProps<T>>) => {
  const [internalOptions, setInternalOptions] = useState<
    MultiSelectBaseContextValue<T>['internalOptions']
  >([]);
  const [currentSearchValue, setCurrentSearchValue] = useState<string | null>(
    null,
  );

  const onAllSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;

    setInternalOptions((prev) =>
      prev.map((option) => ({ ...option, isSelected: checked })),
    );
  };

  const onInternalOptionsChange = ({
    key,
    isSelected,
  }: Pick<MultiSelectInternalOption<T>, 'key'> &
    Pick<SelectBaseItemProps, 'isSelected'>) =>
    setInternalOptions((prev) =>
      prev.map((option) =>
        option.key === key ? { ...option, isSelected } : option,
      ),
    );

  const onRemove = ({ key }: Pick<MultiSelectInternalOption<T>, 'key'>) =>
    onInternalOptionsChange({ key, isSelected: false });

  const onSelect = ({ key }: Pick<MultiSelectInternalOption<T>, 'key'>) =>
    onInternalOptionsChange({ key, isSelected: true });

  const onSearch = useCallback(
    debounce(({ value }: MultiSelectBaseOnSearchParams) => {
      setCurrentSearchValue(value);
    }, 300),
    [],
  );

  const handleChange = () => {
    onChange(
      internalOptions
        .filter((option) => option.isSelected)
        .map(({ value, label }) => ({
          value,
          label,
        })),
    );
  };

  const onRemoveTriggerValueClick = ({
    key,
  }: Pick<MultiSelectInternalOption<T>, 'key'>) => {
    onChange(
      internalOptions
        .filter((option) => option.key !== key && option.isSelected)
        .map(({ value, label }) => ({
          value,
          label,
        })),
    );
  };

  useMultiSelectBaseInitialOptionsEffect({
    value,
    options,
    setInternalOptions,
  });

  const contextValue = {
    onRemove,
    onSelect,
    onAllSelect,
    value,
    internalOptions,
    selectListResultId,
    selectedListResultId,
    onChange: handleChange,
    onRemoveTriggerValueClick,
    onSearch,
    currentSearchValue,
  };

  return (
    <MultiSelectBaseContext.Provider
      value={
        contextValue as unknown as MultiSelectBaseContextValue<MultiSelectBaseValue>
      }
    >
      {children}
    </MultiSelectBaseContext.Provider>
  );
};

export const useMultiSelectBaseContext = <T extends MultiSelectBaseValue>() => {
  const context = useContext(MultiSelectBaseContext);

  if (!context) {
    throw new Error(
      'useMultiSelectBaseContext must be used within a MultiSelectBaseContext',
    );
  }

  return context as unknown as MultiSelectBaseContextValue<T>;
};
