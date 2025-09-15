import { UseFormReturnType } from '@bbodek/hooks';
import { getUUID } from '@bbodek/utils';
import { isEqual } from 'es-toolkit';

import useFormRepeaterInitialValuesEffect from '@/components/FormRepeater/hooks/effects/useFormRepeaterInitialValuesEffect';
import {
  UseFormRepeaterChangedValues,
  UseFormRepeaterOnChangeParams,
  UseFormRepeaterOnDeleteParams,
  UseFormRepeaterOnResetParams,
  UseFormRepeaterProps,
  UseFormRepeaterValuesType,
} from '@/components/FormRepeater/hooks/types';

const useFormRepeater = <T extends object, I extends object>({
  key,
  values,
  originalValues = [],
  initialValue,
  setValues: setExternalValues,
}: UseFormRepeaterProps<T, I>) => {
  const setValues = setExternalValues as UseFormReturnType<
    UseFormRepeaterValuesType<T, I>
  >['setValues'];

  const isChanged = !isEqual(values, originalValues);
  const changedValues =
    !!originalValues && isChanged
      ? values.reduce((acc, value) => {
          const originalValue = originalValues.find(
            ({ id }) => id === value.id,
          );
          const isAddedItem = !originalValue;
          const isChangedItem =
            !!originalValue && !isEqual(value, originalValue);

          if (isAddedItem || isChangedItem) {
            acc[value.id] = { originalValue: originalValue ?? null, value };
          }

          return acc;
        }, {} as UseFormRepeaterChangedValues<I>)
      : {};

  const onAllReset = () => {
    const hasOriginalValues = originalValues.length > 0;

    setValues((prev) => ({
      ...prev,
      [key]: hasOriginalValues
        ? originalValues
        : [{ ...initialValue, id: getUUID() }],
    }));
  };

  const onAdd = () => {
    setValues((prev) => ({
      ...prev,
      [key]: [...prev[key], { ...initialValue, id: getUUID() }],
    }));
  };

  const onChange = ({
    id,
    key: fieldKey,
    value,
  }: UseFormRepeaterOnChangeParams<I>) => {
    setValues((prev) => ({
      ...prev,
      [key]: prev[key].map((item) =>
        item.id === id ? { ...item, [fieldKey]: value } : item,
      ),
    }));
  };

  const onDelete = ({ id }: UseFormRepeaterOnDeleteParams<I>) => {
    setValues((prev) => ({
      ...prev,
      [key]: prev[key].filter((item) => item.id !== id),
    }));
  };

  const onReset = ({ id, originalValue }: UseFormRepeaterOnResetParams<I>) => {
    setValues((prev) => ({
      ...prev,
      [key]: prev[key].map((item) => (item.id === id ? originalValue : item)),
    }));
  };

  useFormRepeaterInitialValuesEffect({
    key,
    initialValue,
    originalValues,
    setValues: setExternalValues,
  });

  return {
    models: { changedValues },
    status: { isChanged },
    operations: { onAdd, onAllReset, onChange, onReset, onDelete },
  };
};

export default useFormRepeater;
