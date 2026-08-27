import clsx from 'clsx';

import {
  CHIP_DEFAULT_SELECT_MODE,
  CHIP_ICON_KEY,
  CHIP_ICON_STYLE,
  CHIP_ICON_WEIGHT,
  CHIP_INPUT_STYLE,
  CHIP_INPUT_TYPES,
  CHIP_SELECT_MODES,
  CHIP_STATE_STYLES,
  CHIP_STATES,
} from '@/components/Chip/Chip/constants';
import { ChipProps } from '@/components/Chip/Chip/types';
import { CHIP_BASE_STYLE } from '@/components/Chip/shared';
import { Icon } from '@/components/Icon';
import { TOUCH_TARGET_NARROW_STYLE } from '@/components/shared/constants';

const Chip = ({
  label,
  checked,
  selectMode = CHIP_DEFAULT_SELECT_MODE,
  id,
  name,
  value,
  className,
  onChange,
  ref,
}: ChipProps) => {
  const { CONTAINER, ICON } =
    CHIP_STATE_STYLES[checked ? CHIP_STATES.SELECTED : CHIP_STATES.DEFAULT];

  const hasIcon = selectMode === CHIP_SELECT_MODES.MULTIPLE;

  return (
    <label
      className={clsx(
        className,
        CHIP_BASE_STYLE,
        TOUCH_TARGET_NARROW_STYLE,
        CONTAINER,
      )}
    >
      <input
        checked={checked}
        className={CHIP_INPUT_STYLE}
        id={id}
        name={name}
        ref={ref}
        type={CHIP_INPUT_TYPES[selectMode]}
        value={value}
        onChange={onChange}
      />
      {label}
      {hasIcon && (
        <Icon
          className={clsx(CHIP_ICON_STYLE, ICON)}
          iconKey={CHIP_ICON_KEY}
          weight={CHIP_ICON_WEIGHT}
          aria-hidden
        />
      )}
    </label>
  );
};

export default Chip;
