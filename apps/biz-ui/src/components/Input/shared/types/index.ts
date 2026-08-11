import {
  INPUT_CONDITION_STATES,
  INPUT_STATES,
} from '@/components/Input/shared/constants';

export type InputState = (typeof INPUT_STATES)[keyof typeof INPUT_STATES];

export type InputConditionState =
  (typeof INPUT_CONDITION_STATES)[keyof typeof INPUT_CONDITION_STATES];

export type InputConditionStyles = Record<'ICON' | 'LABEL', string>;

export interface InputCondition {
  label: string;
  isSatisfied: boolean;
}

export interface InputMessageProps {
  id: string;
  errorMessage?: string;
  conditions?: InputCondition[];
}
