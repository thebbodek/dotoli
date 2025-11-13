import { useId, useState } from 'react';

import {
  INPUT_ELEMENTS,
  TEXTAREA_DEFAULT_MAX_LENGTH,
} from '@/components/Input/shared';
import useInputChange from '@/components/Input/shared/hooks/useInputChange';
import Input from '@/components/Input/shared/Input';
import InputBase from '@/components/Input/shared/InputBase';
import { TextAreaProps } from '@/components/Input/TextArea/types';
import { INPUT_TRIGGER_VARIANTS } from '@/components/shared';
import { Typography } from '@/components/Typography';

const TextArea = ({
  label,
  feedback,
  badge,
  isError = false,
  required = false,
  value,
  name,
  onChange,
  regCallback,
  className,
  disabled = false,
  readOnly = false,
  maxLength = TEXTAREA_DEFAULT_MAX_LENGTH,
  hiddenLabel,
  ...rest
}: TextAreaProps) => {
  const id = useId();
  const [isFocused, setIsFocused] = useState(false);
  const { inputValue, handleChange } = useInputChange({
    value,
    name,
    onChange,
    regCallback,
    maxLength,
  });

  return (
    <InputBase
      badge={badge}
      className={className}
      feedback={feedback}
      hiddenLabel={hiddenLabel}
      id={id}
      isError={isError}
      label={label}
      required={required}
      value={inputValue}
    >
      <Input
        addonEnd={
          <Typography
            className='absolute bottom-[0.312rem] right-[0.687rem]'
            color='gray-03'
            variant='body-12-m'
          >
            <Typography as='strong' color='gray-07' variant='body-12-m'>
              {String(inputValue).length}
            </Typography>
            {`/${maxLength}`}
          </Typography>
        }
        as={INPUT_ELEMENTS.TEXTAREA}
        className='flex-col'
        disabled={disabled}
        id={id}
        inputClassName='resize-none h-full'
        isFocused={isFocused}
        name={name}
        readOnly={readOnly}
        required={required}
        setIsFocused={setIsFocused}
        value={inputValue}
        variant={INPUT_TRIGGER_VARIANTS.TEXTAREA}
        onChange={handleChange}
        {...rest}
      />
    </InputBase>
  );
};

export default TextArea;
