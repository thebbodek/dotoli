import clsx from 'clsx';
import { FocusEvent, useId, useState } from 'react';

import { IconButton } from '@/components/Button/IconButton';
import { ICON_BUTTON_SIZES } from '@/components/Button/IconButton/constants';
import { Icon, ICON_WEIGHTS } from '@/components/Icon';
import {
  SEARCH_INPUT_ARIA_LABELS,
  SEARCH_INPUT_BOX_BASE_STYLE,
  SEARCH_INPUT_BOX_STATE_STYLES,
  SEARCH_INPUT_CLEAR_STATES,
  SEARCH_INPUT_DEFAULT_AUTO_COMPLETE,
  SEARCH_INPUT_FIELD_STYLE,
  SEARCH_INPUT_ICON_KEYS,
  SEARCH_INPUT_PLACEHOLDER,
  SEARCH_INPUT_ROOT_STYLE,
  SEARCH_INPUT_SEARCH_ICON_STYLE,
} from '@/components/Input/SearchInput/constants';
import { SearchInputProps } from '@/components/Input/SearchInput/types';
import { resolveSearchInputState } from '@/components/Input/SearchInput/utils';
import { InputMessage } from '@/components/Input/shared';
import {
  INPUT_BOX_BASE_STYLE,
  INPUT_DEFAULT_MAX_LENGTH,
  INPUT_PLACEHOLDER_STYLE,
} from '@/components/Input/shared/constants';
import { useInitialInputFocusEffect } from '@/components/Input/shared/hooks/effects';
import { preventInputBlur } from '@/components/Input/shared/utils';

const SearchInput = ({
  value,
  placeholder = SEARCH_INPUT_PLACEHOLDER,
  errorMessage,
  id,
  name,
  maxLength = INPUT_DEFAULT_MAX_LENGTH,
  inputMode,
  enterKeyHint,
  autoComplete = SEARCH_INPUT_DEFAULT_AUTO_COMPLETE,
  autoFocus,
  tabIndex,
  className,
  onChange,
  onClear,
  onFocus,
  onBlur,
  onKeyDown,
  ref,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}: SearchInputProps) => {
  const [isFocused, setIsFocused] = useState(!!autoFocus);
  const generatedId = useId();

  const fieldId = id ?? generatedId;
  const messageId = `${fieldId}-message`;

  useInitialInputFocusEffect({ fieldId, setIsFocused });

  const hasValue = value !== '';

  const state = resolveSearchInputState({ errorMessage, isFocused, hasValue });
  const hasClearButton = hasValue && SEARCH_INPUT_CLEAR_STATES.includes(state);

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(event);
  };

  return (
    <div className={clsx(className, SEARCH_INPUT_ROOT_STYLE)}>
      <div
        className={clsx(
          INPUT_BOX_BASE_STYLE,
          SEARCH_INPUT_BOX_BASE_STYLE,
          SEARCH_INPUT_BOX_STATE_STYLES[state],
        )}
      >
        <input
          aria-describedby={errorMessage ? messageId : undefined}
          aria-invalid={!!errorMessage}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          className={clsx(SEARCH_INPUT_FIELD_STYLE, INPUT_PLACEHOLDER_STYLE)}
          enterKeyHint={enterKeyHint}
          id={fieldId}
          inputMode={inputMode}
          maxLength={maxLength}
          name={name}
          placeholder={placeholder}
          ref={ref}
          tabIndex={tabIndex}
          type='search'
          value={value}
          onBlur={handleBlur}
          onChange={onChange}
          onFocus={handleFocus}
          onKeyDown={onKeyDown}
        />
        {hasClearButton ? (
          <IconButton
            aria-label={SEARCH_INPUT_ARIA_LABELS.CLEAR}
            iconKey={SEARCH_INPUT_ICON_KEYS.CLEAR}
            size={ICON_BUTTON_SIZES.SM}
            weight={ICON_WEIGHTS.FILL}
            onClick={onClear}
            onMouseDown={preventInputBlur}
          />
        ) : (
          <Icon
            className={SEARCH_INPUT_SEARCH_ICON_STYLE}
            iconKey={SEARCH_INPUT_ICON_KEYS.SEARCH}
            weight={ICON_WEIGHTS.BOLD}
            aria-hidden
          />
        )}
      </div>
      <InputMessage errorMessage={errorMessage} id={messageId} />
    </div>
  );
};

export default SearchInput;
