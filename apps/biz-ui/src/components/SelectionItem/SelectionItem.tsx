import clsx from 'clsx';

import { Badge } from '@/components/Badge';
import {
  SELECTION_ITEM_BADGE_LABEL,
  SELECTION_ITEM_BADGE_THEME,
  SELECTION_ITEM_BADGE_VARIANT,
  SELECTION_ITEM_BASE_STYLE,
  SELECTION_ITEM_LABEL_STYLE,
  SELECTION_ITEM_STATE_STYLES,
  SELECTION_ITEM_STATES,
} from '@/components/SelectionItem/constants';
import { SelectionItemProps } from '@/components/SelectionItem/types';
import { Typography } from '@/components/Typography';
import { COLOR_VARIANTS, TYPOGRAPHY_VARIANTS } from '@/variants';

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
      className={clsx(
        className,
        SELECTION_ITEM_BASE_STYLE,
        SELECTION_ITEM_STATE_STYLES[
          checked
            ? SELECTION_ITEM_STATES.SELECTED
            : SELECTION_ITEM_STATES.DEFAULT
        ],
      )}
    >
      <input
        checked={checked}
        className='sr-only'
        id={id}
        name={name}
        ref={ref}
        type='radio'
        value={value}
        onChange={onChange}
      />
      <Typography
        as='span'
        className={SELECTION_ITEM_LABEL_STYLE}
        color={COLOR_VARIANTS.GRAY_900}
        variant={TYPOGRAPHY_VARIANTS.BODY_LG}
      >
        {label}
      </Typography>
      {checked && (
        <Badge
          className='shrink-0'
          label={SELECTION_ITEM_BADGE_LABEL}
          theme={SELECTION_ITEM_BADGE_THEME}
          variant={SELECTION_ITEM_BADGE_VARIANT}
        />
      )}
    </label>
  );
};

export default SelectionItem;
