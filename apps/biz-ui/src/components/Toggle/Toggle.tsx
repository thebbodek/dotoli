import clsx from 'clsx';

import { TOUCH_TARGET_STYLE } from '@/components/shared/constants';
import {
  TOGGLE_KNOB_STYLE,
  TOGGLE_LABEL_STYLE,
  TOGGLE_STATE_STYLES,
  TOGGLE_STATES,
  TOGGLE_TRACK_STYLE,
} from '@/components/Toggle/constants';
import { ToggleProps } from '@/components/Toggle/types';

const Toggle = ({
  checked,
  id,
  name,
  value,
  className,
  onChange,
  ref,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}: ToggleProps) => {
  const { TRACK, KNOB } =
    TOGGLE_STATE_STYLES[
      checked ? TOGGLE_STATES.CHECKED : TOGGLE_STATES.DEFAULT
    ];

  return (
    <label className={clsx(className, TOGGLE_LABEL_STYLE, TOUCH_TARGET_STYLE)}>
      <input
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        checked={checked}
        className='sr-only'
        id={id}
        name={name}
        ref={ref}
        role='switch'
        type='checkbox'
        value={value}
        onChange={onChange}
      />
      <span className={clsx(TOGGLE_TRACK_STYLE, TRACK)} aria-hidden>
        <span className={clsx(TOGGLE_KNOB_STYLE, KNOB)} />
      </span>
    </label>
  );
};

export default Toggle;
