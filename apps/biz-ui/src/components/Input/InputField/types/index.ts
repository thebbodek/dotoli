import {
  Dispatch,
  HTMLAttributes,
  InputHTMLAttributes,
  RefAttributes,
  SetStateAction,
} from 'react';

import {
  INPUT_FIELD_LABEL_STATES,
  INPUT_FIELD_TYPES,
} from '@/components/Input/InputField/constants';
import { InputCondition } from '@/components/Input/shared/types';

export type InputFieldType =
  (typeof INPUT_FIELD_TYPES)[keyof typeof INPUT_FIELD_TYPES];

export type InputFieldLabelState =
  (typeof INPUT_FIELD_LABEL_STATES)[keyof typeof INPUT_FIELD_LABEL_STATES];

export interface InputFieldStateStyles {
  LABEL: Record<InputFieldLabelState, string>;
  VALUE: string;
}

export type ResolveInputFieldStateProps = Pick<
  InputFieldProps,
  'disabled' | 'errorMessage'
>;

export interface UseInitialInputFieldFocusEffectProps {
  fieldId: string;
  setIsFocused: Dispatch<SetStateAction<boolean>>;
}

/**
 * @description: `type='select'`만 `<button>`을 렌더하고 나머지 셋은 `<input>`입니다.
 * 두 엘리먼트에 함께 걸리는 `ref`와 포커스 핸들러는 유니온으로 받습니다.
 * */
export interface InputFieldProps
  extends Pick<
      InputHTMLAttributes<HTMLInputElement>,
      | 'autoComplete'
      | 'autoFocus'
      | 'className'
      | 'disabled'
      | 'id'
      | 'inputMode'
      | 'maxLength'
      | 'name'
      | 'onChange'
      | 'placeholder'
      | 'readOnly'
      | 'required'
      | 'tabIndex'
      | 'value'
    >,
    Pick<
      HTMLAttributes<HTMLInputElement | HTMLButtonElement>,
      'onBlur' | 'onClick' | 'onFocus'
    >,
    RefAttributes<HTMLInputElement | HTMLButtonElement> {
  label: string;
  type?: InputFieldType;
  errorMessage?: string;
  conditions?: InputCondition[];
  verifyLabel?: string;
  /**
   * `select`가 여는 바텀시트의 열림 상태. 스타일에는 쓰지 않고 `aria-expanded`에만
   * 실립니다 — 트리거의 시각 상태는 값 유무로 갈리고 열림 여부는 시맨틱입니다.
   * */
  isOpen?: boolean;
  onClear?: () => void;
  onVerify?: () => void;
}
