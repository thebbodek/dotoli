import { InputHTMLAttributes, RefAttributes } from 'react';

import { SEARCH_INPUT_STATES } from '@/components/Input/SearchInput/constants';

export type SearchInputState =
  (typeof SEARCH_INPUT_STATES)[keyof typeof SEARCH_INPUT_STATES];

export interface SearchInputProps
  extends Pick<
      InputHTMLAttributes<HTMLInputElement>,
      | 'aria-label'
      | 'aria-labelledby'
      | 'autoComplete'
      | 'autoFocus'
      | 'className'
      | 'enterKeyHint'
      | 'id'
      | 'inputMode'
      | 'maxLength'
      | 'name'
      | 'onBlur'
      | 'onFocus'
      | 'onKeyDown'
      | 'placeholder'
      | 'tabIndex'
    >,
    Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>>,
    RefAttributes<HTMLInputElement> {
  errorMessage?: string;
  onClear: () => void;
}

export interface ResolveSearchInputStateProps
  extends Pick<SearchInputProps, 'errorMessage'> {
  isFocused: boolean;
  hasValue: boolean;
}
