import useFilterSelectOptionPanel from '@/components/Filter/hooks/useFilterSelectOptionPanel';
import { MultiSelectBaseValue, MultiSelectOption } from '@/components/Select';

const useFilterMultiSelectPanel = () => {
  const {
    models: { options: selectOptions, value: selectValue },
    operations: { handleChange },
  } = useFilterSelectOptionPanel();

  const options = selectOptions!.options!.map(({ value, displayValue }) => ({
    value,
    label: displayValue,
  }));

  const value = (selectValue ?? []).map((value) => ({
    value: value,
    label: options.find((option) => option.value === value)?.label ?? '',
  }));

  const onChange = (values: MultiSelectOption<MultiSelectBaseValue>[]) => {
    const _value = values ? values.map(({ value }) => value as string) : null;

    handleChange({ value: _value });
  };

  return {
    models: {
      value,
      options,
    },
    operations: { onChange },
  };
};

export default useFilterMultiSelectPanel;
