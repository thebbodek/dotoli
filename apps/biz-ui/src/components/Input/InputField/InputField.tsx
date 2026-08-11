import clsx from 'clsx';
import { FocusEvent, Ref, useId, useState } from 'react';

import { CtaButton } from '@/components/Button/CtaButton';
import { CTA_BUTTON_SIZES } from '@/components/Button/CtaButton/constants';
import { IconButton } from '@/components/Button/IconButton';
import { ICON_BUTTON_SIZES } from '@/components/Button/IconButton/constants';
import { Icon, ICON_WEIGHTS } from '@/components/Icon';
import {
  INPUT_FIELD_ARIA_LABELS,
  INPUT_FIELD_BOX_STYLE,
  INPUT_FIELD_CARET_STYLE,
  INPUT_FIELD_CONTENT_STYLE,
  INPUT_FIELD_ICON_KEYS,
  INPUT_FIELD_INPUT_STYLE,
  INPUT_FIELD_LABEL_BASE_STYLE,
  INPUT_FIELD_LABEL_POSITION_STYLES,
  INPUT_FIELD_LABEL_STATES,
  INPUT_FIELD_ROOT_STYLE,
  INPUT_FIELD_SELECT_PLACEHOLDER_STYLE,
  INPUT_FIELD_SELECT_POPUP_ROLE,
  INPUT_FIELD_SELECT_VALUE_STYLE,
  INPUT_FIELD_STYLES,
  INPUT_FIELD_TYPES,
  INPUT_FIELD_VALUE_ROW_STYLE,
  INPUT_FIELD_VERIFY_LABEL,
} from '@/components/Input/InputField/constants';
import { useInitialInputFieldFocusEffect } from '@/components/Input/InputField/hooks/effects';
import { InputFieldProps } from '@/components/Input/InputField/types';
import { resolveInputFieldState } from '@/components/Input/InputField/utils';
import { InputMessage } from '@/components/Input/shared';
import {
  INPUT_BOX_BASE_STYLE,
  INPUT_BOX_STYLES,
  INPUT_DEFAULT_MAX_LENGTH,
} from '@/components/Input/shared/constants';

const InputField = ({
  label,
  type = INPUT_FIELD_TYPES.TEXT,
  value,
  placeholder,
  errorMessage,
  conditions,
  verifyLabel = INPUT_FIELD_VERIFY_LABEL,
  isOpen,
  id,
  name,
  maxLength = INPUT_DEFAULT_MAX_LENGTH,
  inputMode,
  autoComplete,
  autoFocus,
  tabIndex,
  disabled = false,
  readOnly = false,
  required = false,
  className,
  onChange,
  onFocus,
  onBlur,
  onClick,
  onClear,
  onVerify,
  ref,
}: InputFieldProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(!!autoFocus);
  const generatedId = useId();

  const fieldId = id ?? generatedId;
  const messageId = `${fieldId}-message`;

  useInitialInputFieldFocusEffect({ fieldId, setIsFocused });

  const isSelect = type === INPUT_FIELD_TYPES.SELECT;
  const isPassword = type === INPUT_FIELD_TYPES.PASSWORD;
  const hasValue = value !== undefined && value !== '';
  const hasMessage = !!errorMessage || !!conditions?.length;

  const state = resolveInputFieldState({ disabled, errorMessage });
  const { LABEL, VALUE } = INPUT_FIELD_STYLES[state];

  const labelState =
    hasValue || isFocused
      ? INPUT_FIELD_LABEL_STATES.FLOATING
      : INPUT_FIELD_LABEL_STATES.COLLAPSED;

  const boxClassName = clsx(
    INPUT_BOX_BASE_STYLE,
    INPUT_BOX_STYLES[state],
    INPUT_FIELD_BOX_STYLE,
  );
  const labelClassName = clsx(
    INPUT_FIELD_LABEL_BASE_STYLE,
    INPUT_FIELD_LABEL_POSITION_STYLES[labelState],
    LABEL[labelState],
  );

  const hasClearButton =
    type === INPUT_FIELD_TYPES.TEXT &&
    hasValue &&
    !!onClear &&
    !disabled &&
    !readOnly;

  const handleFocus = (
    event: FocusEvent<HTMLInputElement | HTMLButtonElement>,
  ) => {
    setIsFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (
    event: FocusEvent<HTMLInputElement | HTMLButtonElement>,
  ) => {
    setIsFocused(false);
    onBlur?.(event);
  };

  return (
    <div className={clsx(className, INPUT_FIELD_ROOT_STYLE)}>
      {isSelect ? (
        <button
          aria-describedby={hasMessage ? messageId : undefined}
          aria-expanded={isOpen}
          aria-haspopup={INPUT_FIELD_SELECT_POPUP_ROLE}
          aria-invalid={!!errorMessage}
          autoFocus={autoFocus}
          className={boxClassName}
          disabled={disabled}
          id={fieldId}
          ref={ref as Ref<HTMLButtonElement>}
          tabIndex={tabIndex}
          type='button'
          onBlur={handleBlur}
          onClick={onClick}
          onFocus={handleFocus}
        >
          <span className={INPUT_FIELD_CONTENT_STYLE}>
            <span className={labelClassName}>{label}</span>
            <span className={INPUT_FIELD_VALUE_ROW_STYLE}>
              {hasValue ? (
                <span className={clsx(INPUT_FIELD_SELECT_VALUE_STYLE, VALUE)}>
                  {value}
                </span>
              ) : (
                isFocused && (
                  <span className={INPUT_FIELD_SELECT_PLACEHOLDER_STYLE}>
                    {placeholder}
                  </span>
                )
              )}
            </span>
          </span>
          <Icon
            className={INPUT_FIELD_CARET_STYLE}
            iconKey={INPUT_FIELD_ICON_KEYS.SELECT}
            weight={ICON_WEIGHTS.FILL}
            aria-hidden
          />
        </button>
      ) : (
        <div className={boxClassName}>
          <div className={INPUT_FIELD_CONTENT_STYLE}>
            <label className={labelClassName} htmlFor={fieldId}>
              {label}
            </label>
            <div className={INPUT_FIELD_VALUE_ROW_STYLE}>
              <input
                aria-describedby={hasMessage ? messageId : undefined}
                aria-invalid={!!errorMessage}
                autoComplete={autoComplete}
                autoFocus={autoFocus}
                className={clsx(INPUT_FIELD_INPUT_STYLE, VALUE)}
                disabled={disabled}
                id={fieldId}
                inputMode={inputMode}
                maxLength={maxLength}
                name={name}
                placeholder={isFocused ? placeholder : undefined}
                readOnly={readOnly}
                ref={ref as Ref<HTMLInputElement>}
                required={required}
                tabIndex={tabIndex}
                type={isPassword && !isPasswordVisible ? 'password' : 'text'}
                value={value ?? ''}
                onBlur={handleBlur}
                onChange={onChange}
                onClick={onClick}
                onFocus={handleFocus}
              />
              {hasClearButton && (
                <IconButton
                  aria-label={INPUT_FIELD_ARIA_LABELS.CLEAR}
                  iconKey={INPUT_FIELD_ICON_KEYS.CLEAR}
                  size={ICON_BUTTON_SIZES.SM}
                  weight={ICON_WEIGHTS.FILL}
                  onClick={onClear}
                />
              )}
            </div>
          </div>
          {isPassword && (
            <IconButton
              aria-label={
                isPasswordVisible
                  ? INPUT_FIELD_ARIA_LABELS.PASSWORD_HIDE
                  : INPUT_FIELD_ARIA_LABELS.PASSWORD_SHOW
              }
              iconKey={
                isPasswordVisible
                  ? INPUT_FIELD_ICON_KEYS.PASSWORD_VISIBLE
                  : INPUT_FIELD_ICON_KEYS.PASSWORD_HIDDEN
              }
              disabled={disabled}
              size={ICON_BUTTON_SIZES.SM}
              weight={ICON_WEIGHTS.BOLD}
              onClick={() => setIsPasswordVisible((isVisible) => !isVisible)}
            />
          )}
          {type === INPUT_FIELD_TYPES.VERIFY && (
            <CtaButton
              disabled={disabled || !!errorMessage}
              label={verifyLabel}
              size={CTA_BUTTON_SIZES.SM}
              onClick={onVerify}
            />
          )}
        </div>
      )}
      <InputMessage
        conditions={conditions}
        errorMessage={errorMessage}
        id={messageId}
      />
    </div>
  );
};

export default InputField;
