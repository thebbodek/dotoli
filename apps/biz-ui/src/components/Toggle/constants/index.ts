import { ToggleState, ToggleStateStyles } from '@/components/Toggle/types';

export const TOGGLE_STATES = {
  DEFAULT: 'default',
  CHECKED: 'checked',
} as const;

export const TOGGLE_LABEL_STYLE =
  'flex-h-stack-center relative w-fit cursor-pointer';

export const TOGGLE_TRACK_STYLE =
  'flex-h-stack h-[30px] w-[52px] items-center rounded-full p-[3px] transition-colors';

export const TOGGLE_KNOB_STYLE =
  'size-[24px] shrink-0 rounded-full bg-white transition-transform';

export const TOGGLE_STATE_STYLES: Record<ToggleState, ToggleStateStyles> = {
  [TOGGLE_STATES.DEFAULT]: {
    TRACK: 'bg-gray-300',
    KNOB: '',
  },
  [TOGGLE_STATES.CHECKED]: {
    TRACK: 'bg-blue-500',
    KNOB: 'translate-x-[22px]',
  },
};
