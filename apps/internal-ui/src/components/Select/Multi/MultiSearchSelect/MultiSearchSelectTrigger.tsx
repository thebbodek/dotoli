import clsx from 'clsx';

import { Chip } from '@/components/Chip';
import MultiSearchSelectOverflowCount from '@/components/Select/Multi/MultiSearchSelect/MultiSearchSelectOverflowCount';
import { MULTI_SEARCH_SELECT_MAX_COUNT } from '@/components/Select/Multi/shared';
import { useMultiSelectBaseContext } from '@/components/Select/Multi/shared/context/MultiSelectBaseContext';
import { getOptionKey } from '@/components/Select/Multi/shared/utils';
import {
  SelectBaseTriggerWrapper,
  useSelectTriggerContext,
} from '@/components/Select/shared';
import { Typography } from '@/components/Typography';

const MultiSearchSelectTrigger = () => {
  const { placeholder, disabled } = useSelectTriggerContext();
  const { value, onRemove, onRemoveTriggerValueClick } =
    useMultiSelectBaseContext();
  const hasValue = value.length > 0;
  const isOverflow = hasValue && value.length > MULTI_SEARCH_SELECT_MAX_COUNT;

  const renderer = () => {
    if (!hasValue) {
      return (
        <Typography variant='body-16-r' color={'gray-04'}>
          {placeholder}
        </Typography>
      );
    }

    const _value = value.slice(0, MULTI_SEARCH_SELECT_MAX_COUNT);

    return (
      <div className='flex w-full gap-x-1 overflow-hidden'>
        <div
          className={clsx(
            'flex gap-x-1',
            !isOverflow ? 'w-full' : 'w-[calc(100%-2.625rem)]',
          )}
        >
          {_value.map(({ label, value }) => {
            const optionKey = getOptionKey({ value, label });
            const isMaxValue = _value.length >= MULTI_SEARCH_SELECT_MAX_COUNT;

            return (
              <Chip
                className={clsx(isMaxValue ? 'max-w-1/2' : 'max-w-full')}
                key={value}
                label={label}
                disabled={disabled}
                onClick={() => {
                  if (disabled) return;

                  onRemoveTriggerValueClick({
                    key: optionKey,
                  });
                  onRemove({ key: optionKey });
                }}
              />
            );
          })}
        </div>
        {isOverflow && (
          <MultiSearchSelectOverflowCount
            disabled={disabled}
            count={value.length - MULTI_SEARCH_SELECT_MAX_COUNT}
          />
        )}
      </div>
    );
  };

  return <SelectBaseTriggerWrapper>{renderer()}</SelectBaseTriggerWrapper>;
};

export default MultiSearchSelectTrigger;
