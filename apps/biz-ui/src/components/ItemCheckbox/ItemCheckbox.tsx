import clsx from 'clsx';

import CheckboxBase from '@/components/Checkbox/CheckboxBase';
import CheckboxIcon from '@/components/Checkbox/CheckboxIcon';
import {
  ITEM_CHECKBOX_BASE_STYLE,
  ITEM_CHECKBOX_LABEL_STYLE,
  ITEM_CHECKBOX_STATE_STYLES,
  ITEM_CHECKBOX_STATES,
} from '@/components/ItemCheckbox/constants';
import { ItemCheckboxProps } from '@/components/ItemCheckbox/types';
import { Typography } from '@/components/Typography';
import { COLOR_VARIANTS, TYPOGRAPHY_VARIANTS } from '@/variants';

const ItemCheckbox = ({ label, className, ...props }: ItemCheckboxProps) => {
  const { checked } = props;

  return (
    <CheckboxBase
      {...props}
      className={clsx(
        className,
        ITEM_CHECKBOX_BASE_STYLE,
        ITEM_CHECKBOX_STATE_STYLES[
          checked ? ITEM_CHECKBOX_STATES.CHECKED : ITEM_CHECKBOX_STATES.DEFAULT
        ],
      )}
    >
      <Typography
        as='span'
        className={ITEM_CHECKBOX_LABEL_STYLE}
        color={COLOR_VARIANTS.GRAY_900}
        variant={TYPOGRAPHY_VARIANTS.BODY_LG}
      >
        {label}
      </Typography>
      <CheckboxIcon checked={checked} />
    </CheckboxBase>
  );
};

export default ItemCheckbox;
