import clsx from 'clsx';
import { ChangeEvent, useId } from 'react';

import { IconButton } from '@/components/Button/IconButton';
import {
  QUANTITY_STEPPER_ARIA_LABELS,
  QUANTITY_STEPPER_BASE_STYLE,
  QUANTITY_STEPPER_CONTROL_STYLE,
  QUANTITY_STEPPER_ICON_KEYS,
  QUANTITY_STEPPER_IMAGE_STYLE,
  QUANTITY_STEPPER_INPUT_MODE,
  QUANTITY_STEPPER_INPUT_STYLE,
  QUANTITY_STEPPER_MAX,
  QUANTITY_STEPPER_PLACEHOLDER,
  QUANTITY_STEPPER_PRODUCT_STYLE,
  QUANTITY_STEPPER_ROW_STYLE,
  QUANTITY_STEPPER_STATE_STYLES,
  QUANTITY_STEPPER_STATES,
  QUANTITY_STEPPER_STYLES,
  QUANTITY_STEPPER_TOTAL_STYLE,
} from '@/components/Order/QuantityStepper/constants';
import { QuantityStepperProps } from '@/components/Order/QuantityStepper/types';
import {
  generateQuantityStepperTotalLabel,
  parseQuantityInput,
  resolveQuantityStepperState,
} from '@/components/Order/QuantityStepper/utils';
import { Typography } from '@/components/Typography';
import { TYPOGRAPHY_VARIANTS } from '@/variants';

const QuantityStepper = ({
  name,
  imageUrl,
  value,
  unitsPerBox,
  onChange,
  errorMessage,
  max = QUANTITY_STEPPER_MAX,
  placeholder = QUANTITY_STEPPER_PLACEHOLDER,
  className,
}: QuantityStepperProps) => {
  const { NAME, MESSAGE } = QUANTITY_STEPPER_STYLES;
  const generatedId = useId();
  const nameId = `${generatedId}-name`;
  const messageId = `${generatedId}-message`;

  const state = resolveQuantityStepperState({ value, max });
  const { INPUT, TOTAL, TOTAL_LABEL } = QUANTITY_STEPPER_STATE_STYLES[state];

  const hasValue = value !== null;
  const hasError = state === QUANTITY_STEPPER_STATES.ERROR;
  const hasMessage = hasError && !!errorMessage;
  const isDecreaseDisabled = !hasValue || value === 0;

  const handleDecrease = () => onChange((value ?? 0) - 1);

  const handleIncrease = () => onChange((value ?? 0) + 1);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    onChange(parseQuantityInput({ value: event.target.value }));

  return (
    <div className={clsx(className, QUANTITY_STEPPER_BASE_STYLE)}>
      <div className={QUANTITY_STEPPER_PRODUCT_STYLE}>
        <img
          alt={name}
          className={QUANTITY_STEPPER_IMAGE_STYLE}
          src={imageUrl}
        />
        <Typography
          color={NAME}
          id={nameId}
          variant={TYPOGRAPHY_VARIANTS.BODY_SEMIBOLD}
        >
          {name}
        </Typography>
      </div>
      <div className={QUANTITY_STEPPER_CONTROL_STYLE}>
        <div className={QUANTITY_STEPPER_ROW_STYLE}>
          <IconButton
            aria-label={QUANTITY_STEPPER_ARIA_LABELS.DECREASE}
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
            iconKey={QUANTITY_STEPPER_ICON_KEYS.INCREASE}
            onClick={handleIncrease}
          />
        </div>
        <div className={clsx(QUANTITY_STEPPER_TOTAL_STYLE, TOTAL)}>
          <Typography
            color={TOTAL_LABEL}
            variant={TYPOGRAPHY_VARIANTS.LABEL_SEMIBOLD}
          >
            {generateQuantityStepperTotalLabel({ value, unitsPerBox })}
          </Typography>
        </div>
        {hasMessage && (
          <Typography
            color={MESSAGE}
            id={messageId}
            variant={TYPOGRAPHY_VARIANTS.CAPTION}
          >
            {errorMessage}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default QuantityStepper;
