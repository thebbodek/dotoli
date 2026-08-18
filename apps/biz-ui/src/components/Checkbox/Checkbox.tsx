import clsx from 'clsx';

import {
  CHECKBOX_BASE_STYLE,
  CHECKBOX_ICON_KEY,
  CHECKBOX_ICON_WEIGHT,
  CHECKBOX_INPUT_STYLE,
  CHECKBOX_STATE_STYLES,
} from '@/components/Checkbox/constants';
import { CheckboxProps } from '@/components/Checkbox/types';
import { resolveCheckboxState } from '@/components/Checkbox/utils';
import { Icon } from '@/components/Icon';
import { TOUCH_TARGET_STYLE } from '@/components/shared/constants';

const Checkbox = ({
  checked,
  disabled = false,
  id,
  name,
  value,
  className,
  onChange,
  ref,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}: CheckboxProps) => {
  const state = resolveCheckboxState({ checked, disabled });

  return (
    <label
      className={clsx(
        className,
        CHECKBOX_BASE_STYLE,
        TOUCH_TARGET_STYLE,
        CHECKBOX_STATE_STYLES[state],
      )}
    >
      <input
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        checked={checked}
        className={CHECKBOX_INPUT_STYLE}
        disabled={disabled}
        id={id}
        name={name}
        ref={ref}
        type='checkbox'
        value={value}
        onChange={onChange}
      />
      {checked && (
        <Icon
          iconKey={CHECKBOX_ICON_KEY}
          weight={CHECKBOX_ICON_WEIGHT}
          aria-hidden
        />
      )}
    </label>
  );
};

export default Checkbox;
