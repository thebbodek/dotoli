import { Chip } from '@/components/Chip';
import { MultiSearchSelectSelectedListItemProps } from '@/components/Select/Multi/MultiSearchSelect/types';
import { useMultiSelectBaseContext } from '@/components/Select/Multi/shared/context/MultiSelectBaseContext';
import { MultiSelectBaseValue } from '@/components/Select/Multi/shared/types';

const MultiSearchSelectSelectedListItem = <T extends MultiSelectBaseValue>({
  optionKey,
  label,
}: MultiSearchSelectSelectedListItemProps<T>) => {
  const { onRemove } = useMultiSelectBaseContext();

  return (
    <li className='flex items-stretch' role='option' title={label}>
      <Chip label={label} onClick={() => onRemove({ key: optionKey })} />
    </li>
  );
};

export default MultiSearchSelectSelectedListItem;
