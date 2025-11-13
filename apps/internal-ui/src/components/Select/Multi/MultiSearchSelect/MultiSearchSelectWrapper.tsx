import MultiSearchSelectTrigger from '@/components/Select/Multi/MultiSearchSelect/MultiSearchSelectTrigger';
import { MultiSearchSelectWrapperProps } from '@/components/Select/Multi/MultiSearchSelect/types';
import { useMultiSelectBaseContext } from '@/components/Select/Multi/shared/context/MultiSelectBaseContext';
import { SELECT_TYPE, SelectBase } from '@/components/Select/shared';

const MultiSearchSelectWrapper = ({
  children,
  className,
  label,
  disabled,
  feedback,
  required,
  isError,
  placeholder,
  controls,
  labelId,
  popoverOption,
}: MultiSearchSelectWrapperProps) => {
  const { setMultiSelectInternalOptions, setCurrentSearchValue } =
    useMultiSelectBaseContext();

  const onClearMultiSelect = () => {
    setMultiSelectInternalOptions();
    setCurrentSearchValue(null);
  };

  const _popoverOption = {
    ...(popoverOption ?? {}),
    onPopoverClose: () => {
      popoverOption?.onPopoverClose?.();
      onClearMultiSelect();
    },
  };

  return (
    <SelectBase
      className={className}
      controls={controls}
      disabled={disabled}
      feedback={feedback}
      isError={isError}
      label={label}
      labelId={labelId}
      placeholder={placeholder}
      popoverOption={_popoverOption}
      required={required}
      trigger={<MultiSearchSelectTrigger />}
      type={SELECT_TYPE.MULTI_SEARCH_SELECT}
    >
      {children}
    </SelectBase>
  );
};

export default MultiSearchSelectWrapper;
