import { ChangeEvent, useState } from 'react';

import { FILTER_TYPES } from '@/components/Filter/constants';
import { useFilterPanelContext } from '@/components/Filter/context/useFilterPanelContext';
import useFilterSelectOptionPanel from '@/components/Filter/hooks/useFilterSelectOptionPanel';
import { parseNumericInput } from '@/components/Filter/utils';

const NUMERIC_INPUT_PLACEHOLDER = '숫자만 입력 가능합니다';
const NUMERIC_DECIMAL_INPUT_PLACEHOLDER =
  '숫자만 입력 가능합니다 (소수점 입력 가능)';
const TEXT_INPUT_PLACEHOLDER = '검색어를 입력해주세요';

const useFilterInputPanel = () => {
  const {
    models: { value },
    operations: { handleChange },
  } = useFilterSelectOptionPanel();
  const { currentOptions } = useFilterPanelContext();
  const {
    type,
    label,
    numericOption,
    placeholder: customPlaceholder,
  } = currentOptions!;
  const { min, max, isDecimal = false } = numericOption ?? {};
  const isNumeric = type === FILTER_TYPES.NUMERIC_INPUT;

  const initialValue = value?.[0] ?? '';
  const [inputValue, setInputValue] = useState(initialValue);

  const numericPlaceholder = isDecimal
    ? NUMERIC_DECIMAL_INPUT_PLACEHOLDER
    : NUMERIC_INPUT_PLACEHOLDER;
  const defaultPlaceholder = isNumeric
    ? numericPlaceholder
    : TEXT_INPUT_PLACEHOLDER;
  const placeholder = customPlaceholder ?? defaultPlaceholder;

  const regCallback = isNumeric
    ? (str: string) => parseNumericInput({ value: str, isDecimal, min, max })
    : undefined;

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmit = () => {
    handleChange({ value: inputValue ? [inputValue] : null });
  };

  const isDisabled = inputValue === '' || inputValue === initialValue;

  return {
    models: { label, inputValue, placeholder, regCallback },
    operations: { onChange, onSubmit },
    status: { isDisabled },
  };
};

export default useFilterInputPanel;
