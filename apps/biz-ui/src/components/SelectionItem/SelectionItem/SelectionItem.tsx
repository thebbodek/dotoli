import { SELECTION_ITEM_INPUT_STYLE } from '@/components/SelectionItem/SelectionItem/constants';
import { SelectionItemProps } from '@/components/SelectionItem/SelectionItem/types';
import SelectionItemContent from '@/components/SelectionItem/shared/SelectionItemContent';
import { generateSelectionItemStyle } from '@/components/SelectionItem/shared/utils';

const SelectionItem = ({
  label,
  checked,
  id,
  name,
  value,
  className,
  onChange,
  ref,
}: SelectionItemProps) => {
  return (
    <label
      className={generateSelectionItemStyle({ isSelected: checked, className })}
    >
      <input
        checked={checked}
        className={SELECTION_ITEM_INPUT_STYLE}
        id={id}
        name={name}
        ref={ref}
        type='radio'
        value={value}
        onChange={onChange}
      />
      <SelectionItemContent isSelected={checked} label={label} />
    </label>
  );
};

export default SelectionItem;
