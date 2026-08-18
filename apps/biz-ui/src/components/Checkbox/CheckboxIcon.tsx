import clsx from 'clsx';

import {
  CHECKBOX_ICON_KEY,
  CHECKBOX_ICON_STYLE,
  CHECKBOX_ICON_WEIGHT,
  CHECKBOX_STATE_STYLES,
} from '@/components/Checkbox/constants';
import { CheckboxIconProps } from '@/components/Checkbox/types';
import { resolveCheckboxState } from '@/components/Checkbox/utils';
import { Icon } from '@/components/Icon';

const CheckboxIcon = ({ checked, disabled }: CheckboxIconProps) => {
  const state = resolveCheckboxState({ checked, disabled });

  return (
    <span
      className={clsx(CHECKBOX_ICON_STYLE, CHECKBOX_STATE_STYLES[state])}
      aria-hidden
    >
      {checked && (
        <Icon iconKey={CHECKBOX_ICON_KEY} weight={CHECKBOX_ICON_WEIGHT} />
      )}
    </span>
  );
};

export default CheckboxIcon;
