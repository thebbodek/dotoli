import clsx from 'clsx';
import { useId, useState } from 'react';

import { Popover } from '@/components/Popover';
import { SELECT_TYPE } from '@/components/Select/shared/constants';
import { SelectLabelProvider } from '@/components/Select/shared/context/SelectLabelContext';
import { SelectTriggerProvider } from '@/components/Select/shared/context/SelectTriggerContext';
import SelectFeedback from '@/components/Select/shared/SelectBaseFeedback';
import SelectBaseItem from '@/components/Select/shared/SelectBaseItem';
import SelectLabel from '@/components/Select/shared/SelectBaseLabel';
import SelectPopoverWrapper from '@/components/Select/shared/SelectBasePopoverWrapper';
import {
  SelectBaseAriaAttributes,
  SelectBaseProps,
} from '@/components/Select/shared/types';

const SelectBase = ({
  required = false,
  className,
  trigger,
  isError = false,
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
  const _isError = !isOpen && isError && !!feedback && !disabled;
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
      'aria-describedby': _isError ? feedbackId : undefined,
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
    <div {...getAriaAttributes()} className={clsx(className, 'flex-v-stack')}>
      <SelectLabelProvider id={labelId} required={required}>
        {label}
      </SelectLabelProvider>
      <Popover
        isOpen={isOpen && !disabled}
        trigger={
          <SelectTriggerProvider
            isOpen={isOpen}
            onToggle={onToggle}
            disabled={disabled}
            isError={_isError}
            placeholder={placeholder}
          >
            {trigger}
          </SelectTriggerProvider>
        }
        {..._popoverOption}
      >
        {!isFunction ? children : children({ close })}
      </Popover>
      {_isError && <SelectFeedback id={feedbackId}>{feedback}</SelectFeedback>}
    </div>
  );
};

export default SelectBase;

SelectBase.displayName = 'SelectBase';
SelectBase.Label = SelectLabel;
SelectBase.PopoverWrapper = SelectPopoverWrapper;
SelectBase.Item = SelectBaseItem;
