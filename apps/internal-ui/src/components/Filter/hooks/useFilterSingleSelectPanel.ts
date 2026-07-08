import useFilterSelectOptionPanel from '@/components/Filter/hooks/useFilterSelectOptionPanel';
import {
  SelectValue,
  SingleSelectOnSelectParams,
} from '@/components/Select/Single/shared/types';

const useFilterSingleSelectPanel = () => {
  const {
    models: { options: selectOptions, value: selectValue },
    operations: { handleChange },
  } = useFilterSelectOptionPanel();

  const options = (selectOptions!.options ?? []).map(
    ({ value, displayValue }) => ({ value, label: displayValue }),
  );
  const value: SelectValue = selectValue?.[0] ?? null;

  const onSelect = ({ value }: SingleSelectOnSelectParams<SelectValue>) => {
    handleChange({ value: value === null ? null : [String(value)] });
  };

  return {
    models: { value, options },
    operations: { onSelect },
  };
};

export default useFilterSingleSelectPanel;
