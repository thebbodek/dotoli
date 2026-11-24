import clsx from 'clsx';
import { ChangeEvent, useId } from 'react';

import { IconButton } from '@/components/Button/IconButton';
import {
  QUANTITY_STEPPER_ARIA_LABELS,
  QUANTITY_STEPPER_BASE_STYLE,
  QUANTITY_STEPPER_BODY_STYLE,
  QUANTITY_STEPPER_BUTTON_STYLE,
  QUANTITY_STEPPER_CONTROL_STYLE,
  QUANTITY_STEPPER_ICON_KEYS,
  QUANTITY_STEPPER_INPUT_MODE,
  QUANTITY_STEPPER_INPUT_STYLE,
  QUANTITY_STEPPER_MAX,
  QUANTITY_STEPPER_MESSAGE_STYLE,
  QUANTITY_STEPPER_NAME_COLOR,
  QUANTITY_STEPPER_NAME_STYLE,
  QUANTITY_STEPPER_PLACEHOLDER,
  QUANTITY_STEPPER_ROW_STYLE,
  QUANTITY_STEPPER_STATE_STYLES,
  QUANTITY_STEPPER_STATES,
} from '@/components/Order/QuantityStepper/constants';
import { QuantityStepperProps } from '@/components/Order/QuantityStepper/types';
import {
  generateQuantityStepperTotalLabel,
  parseQuantityInput,
  resolveQuantityStepperMessage,
  resolveQuantityStepperState,
} from '@/components/Order/QuantityStepper/utils';
import { Typography } from '@/components/Typography';
import { TYPOGRAPHY_VARIANTS } from '@/variants';

const QuantityStepper = ({
  name,
  value,
  unitsPerBox,
  onChange,
  errorMessage,
  warningMessage,
  max = QUANTITY_STEPPER_MAX,
  placeholder = QUANTITY_STEPPER_PLACEHOLDER,
  className,
}: QuantityStepperProps) => {
  const generatedId = useId();
  const nameId = `${generatedId}-name`;
  const messageId = `${generatedId}-message`;

  const state = resolveQuantityStepperState({ value, max, warningMessage });
  const { INPUT, TOTAL, MESSAGE } = QUANTITY_STEPPER_STATE_STYLES[state];
  const message = resolveQuantityStepperMessage({
    state,
    errorMessage,
    warningMessage,
  });

  const hasValue = value !== null;
  const hasError = state === QUANTITY_STEPPER_STATES.ERROR;
  const hasMessage = !!message;
  const isDecreaseDisabled = !hasValue || value === 0;

  const handleDecrease = () => onChange((value ?? 0) - 1);

  const handleIncrease = () => onChange((value ?? 0) + 1);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    onChange(parseQuantityInput({ value: event.target.value }));

  return (
    <div className={clsx(className, QUANTITY_STEPPER_BASE_STYLE)}>
      <div className={QUANTITY_STEPPER_BODY_STYLE}>
        <div className={QUANTITY_STEPPER_ROW_STYLE}>
          <Typography
            className={QUANTITY_STEPPER_NAME_STYLE}
            color={QUANTITY_STEPPER_NAME_COLOR}
            id={nameId}
            variant={TYPOGRAPHY_VARIANTS.BODY_LG_SEMIBOLD}
          >
            {name}
          </Typography>
          <div className={QUANTITY_STEPPER_CONTROL_STYLE}>
            <IconButton
              aria-label={QUANTITY_STEPPER_ARIA_LABELS.DECREASE}
              className={QUANTITY_STEPPER_BUTTON_STYLE}
              disabled={isDecreaseDisabled}
              iconKey={QUANTITY_STEPPER_ICON_KEYS.DECREASE}
              onClick={handleDecrease}
            />
            <input
              aria-describedby={hasMessage ? messageId : undefined}
              aria-invalid={hasError}
              aria-labelledby={nameId}
              className={clsx(QUANTITY_STEPPER_INPUT_STYLE, INPUT)}
              inputMode={QUANTITY_STEPPER_INPUT_MODE}
              placeholder={placeholder}
              type='text'
              value={hasValue ? value : ''}
              onChange={handleChange}
            />
            <IconButton
              aria-label={QUANTITY_STEPPER_ARIA_LABELS.INCREASE}
              className={QUANTITY_STEPPER_BUTTON_STYLE}
              iconKey={QUANTITY_STEPPER_ICON_KEYS.INCREASE}
              onClick={handleIncrease}
            />
          </div>
        </div>
        <Typography color={TOTAL} variant={TYPOGRAPHY_VARIANTS.LABEL_SEMIBOLD}>
          {generateQuantityStepperTotalLabel({ value, unitsPerBox })}
        </Typography>
        {hasMessage && (
          <Typography
            className={QUANTITY_STEPPER_MESSAGE_STYLE}
            color={MESSAGE}
            id={messageId}
            variant={TYPOGRAPHY_VARIANTS.CAPTION}
          >
            {message}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default QuantityStepper;
