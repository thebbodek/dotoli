import clsx from 'clsx';
import { FocusEvent, useId, useState } from 'react';

import { InputMessage } from '@/components/Input/shared';
import {
  INPUT_BOX_BASE_STYLE,
  INPUT_BOX_STYLES,
  INPUT_LABEL_STATES,
  INPUT_PLACEHOLDER_STYLE,
  INPUT_STATES,
  INPUT_TEXT_STYLES,
} from '@/components/Input/shared/constants';
import { useInitialInputFocusEffect } from '@/components/Input/shared/hooks/effects';
import { resolveInputState } from '@/components/Input/shared/utils';
import {
  TEXTAREA_BOX_STYLE,
  TEXTAREA_CONTENT_STYLE,
  TEXTAREA_DEFAULT_HEIGHT,
  TEXTAREA_DEFAULT_MAX_LENGTH,
  TEXTAREA_FIELD_STYLE,
  TEXTAREA_LABEL_STYLE,
  TEXTAREA_MIN_HEIGHT,
  TEXTAREA_ROOT_STYLE,
} from '@/components/Input/TextArea/constants';
import { TextAreaProps } from '@/components/Input/TextArea/types';

const TextArea = ({
  label,
  value,
  placeholder,
  errorMessage,
  conditions,
  height = TEXTAREA_DEFAULT_HEIGHT,
  id,
  name,
  maxLength = TEXTAREA_DEFAULT_MAX_LENGTH,
  autoFocus,
  tabIndex,
  disabled = false,
  readOnly = false,
  required = false,
  className,
  onChange,
  onFocus,
  onBlur,
  ref,
}: TextAreaProps) => {
  const [isFocused, setIsFocused] = useState(!!autoFocus);
  const generatedId = useId();

  const fieldId = id ?? generatedId;
  const messageId = `${fieldId}-message`;

  useInitialInputFocusEffect({ fieldId, setIsFocused });

  const isCounterVisible = isFocused || !!errorMessage;
  const hasMessage = !!errorMessage || !!conditions?.length;

  const state = resolveInputState({ disabled, readOnly, errorMessage });
  const { LABEL, VALUE } = INPUT_TEXT_STYLES[state];

  const handleFocus = (event: FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event: FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    onBlur?.(event);
  };

  return (
    <div className={clsx(className, TEXTAREA_ROOT_STYLE)}>
      <div
        className={clsx(
          INPUT_BOX_BASE_STYLE,
          INPUT_BOX_STYLES[state],
          TEXTAREA_BOX_STYLE,
        )}
        style={{ height: Math.max(height, TEXTAREA_MIN_HEIGHT) }}
      >
        <div className={TEXTAREA_CONTENT_STYLE}>
          <label
            className={clsx(
              TEXTAREA_LABEL_STYLE,
              LABEL[INPUT_LABEL_STATES.ACTIVE],
            )}
            htmlFor={fieldId}
          >
            {label}
          </label>
          <textarea
            className={clsx(
              TEXTAREA_FIELD_STYLE,
              INPUT_PLACEHOLDER_STYLE,
              VALUE,
            )}
            placeholder={
              state === INPUT_STATES.DISABLED ? undefined : placeholder
            }
            aria-describedby={hasMessage ? messageId : undefined}
            aria-invalid={!!errorMessage}
            autoFocus={autoFocus}
            disabled={disabled}
            id={fieldId}
            maxLength={maxLength}
            name={name}
            readOnly={readOnly}
            ref={ref}
            required={required}
            tabIndex={tabIndex}
            value={value ?? ''}
            onBlur={handleBlur}
            onChange={onChange}
            onFocus={handleFocus}
          />
        </div>
      </div>
      <InputMessage
        counter={
          isCounterVisible
            ? { current: String(value ?? '').length, max: maxLength }
            : undefined
        }
        conditions={conditions}
        errorMessage={errorMessage}
        id={messageId}
      />
    </div>
  );
};

export default TextArea;
