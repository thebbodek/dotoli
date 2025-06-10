import { highlightText } from '@bbodek/utils';
import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { MultiSearchSelectListItemProps } from '@/components/Select/Multi/MultiSearchSelect/types';
import { useMultiSelectBaseContext } from '@/components/Select/Multi/shared/context/MultiSelectBaseContext';
import MultiSelectBaseListItem from '@/components/Select/Multi/shared/MultiSelectBaseListItem';
import { MultiSelectBaseValue } from '@/components/Select/Multi/shared/types';

const MultiSearchSelectListItem = <T extends MultiSelectBaseValue>({
  optionKey,
  label,
  isSelected,
}: PropsWithChildren<MultiSearchSelectListItemProps<T>>) => {
  const { currentSearchValue } = useMultiSelectBaseContext();

  return (
    <MultiSelectBaseListItem
      optionKey={optionKey}
      className={clsx(
        'text-in-black hover:text-in-primary-06 h-[2rem] gap-x-2 px-3',
        isSelected && 'text-in-primary-06',
      )}
      label={label}
      isSelected={isSelected}
    >
      <span className='truncate'>
        {highlightText({
          text: label,
          targetText: currentSearchValue ?? '',
        })}
      </span>
    </MultiSelectBaseListItem>
  );
};

export default MultiSearchSelectListItem;
