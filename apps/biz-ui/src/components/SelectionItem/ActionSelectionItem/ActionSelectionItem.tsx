import { ActionSelectionItemProps } from '@/components/SelectionItem/ActionSelectionItem/types';
import SelectionItemContent from '@/components/SelectionItem/shared/SelectionItemContent';
import { generateSelectionItemStyle } from '@/components/SelectionItem/shared/utils';

const ActionSelectionItem = ({
  label,
  isSelected,
  className,
  onClick,
  ref,
}: ActionSelectionItemProps) => {
  return (
    <button
      aria-current={isSelected}
      className={generateSelectionItemStyle({ isSelected, className })}
      ref={ref}
      type='button'
      onClick={onClick}
    >
      <SelectionItemContent isSelected={isSelected} label={label} />
    </button>
  );
};

export default ActionSelectionItem;
