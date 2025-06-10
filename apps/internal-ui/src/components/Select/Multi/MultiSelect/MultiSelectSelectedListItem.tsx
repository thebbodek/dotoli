import { Chip } from '@/components/Chip';
import { useMultiSelectContext } from '@/components/Select/Multi/MultiSelect/context/MultiSelectContext';
import { MultiSelectSelectedListItemProps } from '@/components/Select/Multi/MultiSelect/types';

const MultiSelectSelectedListItem = ({
  label,
  value,
}: MultiSelectSelectedListItemProps) => {
  const { onRemove } = useMultiSelectContext();

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    onRemove({ value });
  };

  return (
    <li className='shrink-0'>
      <Chip label={label} onClick={handleRemove} />
    </li>
  );
};

export default MultiSelectSelectedListItem;
