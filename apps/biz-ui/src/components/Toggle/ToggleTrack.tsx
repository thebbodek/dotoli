import clsx from 'clsx';

import {
  TOGGLE_KNOB_STYLE,
  TOGGLE_STATE_STYLES,
  TOGGLE_STATES,
  TOGGLE_TRACK_STYLE,
} from '@/components/Toggle/constants';
import { ToggleTrackProps } from '@/components/Toggle/types';

const ToggleTrack = ({ checked }: ToggleTrackProps) => {
  const { TRACK, KNOB } =
    TOGGLE_STATE_STYLES[
      checked ? TOGGLE_STATES.CHECKED : TOGGLE_STATES.DEFAULT
    ];

  return (
    <span className={clsx(TOGGLE_TRACK_STYLE, TRACK)} aria-hidden>
      <span className={clsx(TOGGLE_KNOB_STYLE, KNOB)} />
    </span>
  );
};

export default ToggleTrack;
