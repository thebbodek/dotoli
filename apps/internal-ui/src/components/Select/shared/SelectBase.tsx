import { useId, useState } from 'react';

import { Popover } from '@/components/Popover';
import { SELECT_TYPE } from '@/components/Select/shared/constants';
import { SelectLabelProvider } from '@/components/Select/shared/context/SelectLabelContext';
import { SelectTriggerProvider } from '@/components/Select/shared/context/SelectTriggerContext';
import SelectBaseItem from '@/components/Select/shared/SelectBaseItem';
import SelectLabel from '@/components/Select/shared/SelectBaseLabel';
import SelectPopoverWrapper from '@/components/Select/shared/SelectBasePopoverWrapper';
import {
  SelectBaseAriaAttributes,
  SelectBaseProps,
} from '@/components/Select/shared/types';
import { InputFeedback } from '@/components/shared';
import { InputWrapper } from '@/components/shared/components/InputWrapper';

const SelectBase = ({
  required = false,
  className,
  trigger,
  isError: isErrorExternal = false,
  placeholder,
  label,
  children,
  popoverOption = {},
  feedback,
  disabled = false,
  type,
  controls,
  labelId,
}: SelectBaseProps) => {
  const feedbackId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const isError = !isOpen && isErrorExternal && !!feedback && !disabled;
  const isFunction = typeof children === 'function';
  const {
    onPopoverClose,
    useClickOutsideEvent = true,
    ...restPopoverOption
  } = popoverOption;

  const close = () => !disabled && setIsOpen(false);

  const handlePopoverClose = () => {
    if (!useClickOutsideEvent || disabled) return;

    close();
    onPopoverClose?.();
  };

  const _popoverOption = {
    ...restPopoverOption,
    useClickOutsideEvent,
    onPopoverClose: useClickOutsideEvent ? handlePopoverClose : undefined,
  };

  const onToggle = () => {
    if (disabled) return;

    setIsOpen((v) => !v);
  };

  const getAriaAttributes = () => {
    const attributes = {
      'aria-haspopup': 'listbox',
      'aria-expanded': isOpen,
      'aria-controls': controls,
      'aria-labelledby': labelId,
      'aria-describedby': isError ? feedbackId : undefined,
    } as SelectBaseAriaAttributes;

    if (type === SELECT_TYPE.SELECT) {
      attributes['role'] = 'listbox';
    }

    if (
      type === SELECT_TYPE.SEARCH_SELECT ||
      type === SELECT_TYPE.MULTI_SEARCH_SELECT
    ) {
      attributes['role'] = 'combobox';
      attributes['aria-autocomplete'] = 'list';
      attributes['aria-multiselectable'] = true;
    }

    return attributes;
  };

  return (
    <InputWrapper {...getAriaAttributes()} className={className}>
      {label && (
        <SelectLabelProvider id={labelId} required={required}>
          {label}
        </SelectLabelProvider>
      )}
      <Popover
        trigger={
          <SelectTriggerProvider
            disabled={disabled}
            isError={isError}
            isOpen={isOpen}
            placeholder={placeholder}
            onToggle={onToggle}
          >
            {trigger}
          </SelectTriggerProvider>
        }
        isOpen={isOpen && !disabled}
        {..._popoverOption}
      >
        {!isFunction ? children : children({ close })}
      </Popover>
      {isError && (
        <InputFeedback className='flex' feedback={feedback} id={feedbackId} />
      )}
    </InputWrapper>
  );
};

export default SelectBase;

SelectBase.displayName = 'SelectBase';
SelectBase.Label = SelectLabel;
SelectBase.PopoverWrapper = SelectPopoverWrapper;
SelectBase.Item = SelectBaseItem;
