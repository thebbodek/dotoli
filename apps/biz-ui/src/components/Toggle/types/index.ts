import { InputHTMLAttributes, RefAttributes } from 'react';

import { TOGGLE_STATES } from '@/components/Toggle/constants';

export type ToggleState = (typeof TOGGLE_STATES)[keyof typeof TOGGLE_STATES];

export type ToggleStateStyles = Record<'TRACK' | 'KNOB', string>;

export interface ToggleTrackProps extends Pick<ToggleProps, 'checked'> {}

export interface ToggleProps
  extends Pick<
      InputHTMLAttributes<HTMLInputElement>,
      | 'aria-describedby'
      | 'aria-label'
      | 'aria-labelledby'
      | 'className'
      | 'id'
      | 'name'
      | 'value'
    >,
    Required<
      Pick<InputHTMLAttributes<HTMLInputElement>, 'checked' | 'onChange'>
    >,
    RefAttributes<HTMLInputElement> {}
