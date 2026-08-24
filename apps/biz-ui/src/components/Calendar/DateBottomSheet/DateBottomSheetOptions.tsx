import {
  DATE_BOTTOM_SHEET_OPTION_CELL_STYLE,
  DATE_BOTTOM_SHEET_OPTION_CHIP_STYLE,
  DATE_BOTTOM_SHEET_OPTION_GRID_STYLE,
} from '@/components/Calendar/DateBottomSheet/constants';
import { DateBottomSheetOptionsProps } from '@/components/Calendar/DateBottomSheet/types';
import { formatDateBottomSheetOption } from '@/components/Calendar/DateBottomSheet/utils';
import { Chip, CHIP_SELECT_MODES } from '@/components/Chip';

const DateBottomSheetOptions = ({
  options,
  value,
  type,
  name,
  onChange,
}: DateBottomSheetOptionsProps) => {
  return (
    <div className={DATE_BOTTOM_SHEET_OPTION_GRID_STYLE}>
      {options.map((option) => (
        <div className={DATE_BOTTOM_SHEET_OPTION_CELL_STYLE} key={option}>
          <Chip
            checked={option === value}
            className={DATE_BOTTOM_SHEET_OPTION_CHIP_STYLE}
            label={formatDateBottomSheetOption({ type, option })}
            name={name}
            selectMode={CHIP_SELECT_MODES.SINGLE}
            value={option}
            onChange={() => onChange({ value: option })}
          />
        </div>
      ))}
    </div>
  );
};

export default DateBottomSheetOptions;
