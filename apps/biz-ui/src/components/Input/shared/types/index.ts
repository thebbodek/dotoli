import { Dispatch, SetStateAction } from 'react';

import {
  INPUT_CONDITION_STATES,
  INPUT_LABEL_STATES,
  INPUT_STATES,
} from '@/components/Input/shared/constants';

export type InputState = (typeof INPUT_STATES)[keyof typeof INPUT_STATES];

export type InputLabelState =
  (typeof INPUT_LABEL_STATES)[keyof typeof INPUT_LABEL_STATES];

export type InputConditionState =
  (typeof INPUT_CONDITION_STATES)[keyof typeof INPUT_CONDITION_STATES];

export type InputConditionStyles = Record<'ICON' | 'LABEL', string>;

export interface InputTextStyles {
  LABEL: Record<InputLabelState, string>;
  VALUE: string;
}

export interface InputCondition {
  label: string;
  isSatisfied: boolean;
}

export interface InputCounter {
  current: number;
  max: number;
}

export interface InputMessageProps {
  id: string;
  errorMessage?: string;
  conditions?: InputCondition[];
  counter?: InputCounter;
}

export interface ResolveInputStateProps {
  disabled?: boolean;
  readOnly?: boolean;
  errorMessage?: string;
}

export interface UseInitialInputFocusEffectProps {
  fieldId: string;
  setIsFocused: Dispatch<SetStateAction<boolean>>;
}
