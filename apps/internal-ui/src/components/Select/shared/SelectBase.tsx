import clsx from 'clsx';
import { useId, useState } from 'react';

import { Popover } from '@/components/Popover';
import { SelectLabelProvider } from '@/components/Select/shared/context/SelectLabelContext';
import { SelectListProvider } from '@/components/Select/shared/context/SelectListContext';
import { SelectTriggerProvider } from '@/components/Select/shared/context/SelectTriggerContext';
import SelectFeedback from '@/components/Select/shared/SelectBaseFeedback';
import SelectItem from '@/components/Select/shared/SelectBaseItem';
import SelectLabel from '@/components/Select/shared/SelectBaseLabel';
import SelectList from '@/components/Select/shared/SelectBaseList';
import SelectPopoverWrapper from '@/components/Select/shared/SelectBasePopoverWrapper';
import SelectTrigger from '@/components/Select/shared/SelectBaseTrigger';
import { SelectBaseProps } from '@/components/Select/shared/types';

const SelectBase = ({
  trigger,
  children,
  popoverOption = {},
  label,
  isError = false,
  disabled = false,
  required = false,
  feedback,
  className,
}: SelectBaseProps) => {
  const labelId = useId();
  const feedbackId = useId();
  const selectListId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const showFeedback = !isOpen && isError && feedback && !disabled;
  const isFunction = typeof children === 'function';
  const {
    onPopoverClose,
    useClickOutsideEvent = true,
    ...restPopoverOption
  } = popoverOption;

  const closePopover = () => {
    if (disabled) return;

    setIsOpen(false);
  };

  const handlePopoverClose = () => {
    if (!useClickOutsideEvent || disabled) return;

    closePopover();
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

  const close = () => setIsOpen(false);

  return (
    <div
      role='combobox'
      aria-haspopup='listbox'
      aria-expanded={isOpen}
      aria-controls={selectListId}
      aria-labelledby={labelId}
      aria-describedby={showFeedback ? feedbackId : undefined}
      className={clsx(className, 'flex-v-stack')}
    >
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
            isError={isError}
          >
            {trigger}
          </SelectTriggerProvider>
        }
        {..._popoverOption}
      >
        <SelectListProvider
          id={selectListId}
          labelId={labelId}
          onPopoverClose={
            useClickOutsideEvent ? handlePopoverClose : closePopover
          }
        >
          {!isFunction ? children : children({ close })}
        </SelectListProvider>
      </Popover>
      {showFeedback && (
        <SelectFeedback id={feedbackId}>{feedback}</SelectFeedback>
      )}
    </div>
  );
};

export default SelectBase;

SelectBase.displayName = 'SelectBase';
SelectBase.Label = SelectLabel;
SelectBase.Trigger = SelectTrigger;
SelectBase.Feedback = SelectFeedback;
SelectBase.PopoverWrapper = SelectPopoverWrapper;
SelectBase.List = SelectList;
SelectBase.Item = SelectItem;
