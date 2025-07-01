import clsx from 'clsx';
import { ChangeEvent, useId, useState } from 'react';

import { INPUT_ELEMENTS } from '@/components/Input/shared';
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
  rootClassName,
  value,
  name,
  onChange,
  regCallback,
  className,
  disabled = false,
  readOnly = false,
  maxLength,
  ...rest
}: TextAreaProps) => {
  const id = useId();
  const [isFocused, setIsFocused] = useState(false);
  const { inputValue, handleChange } = useInputChange({
    value,
    name,
    onChange,
    regCallback,
  });

  const onChangeTextArea = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    if (maxLength && e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
    }

    handleChange(e);
  };

  return (
    <InputBase
      id={id}
      label={label}
      feedback={feedback}
      isError={isError}
      badge={badge}
      required={required}
      className={rootClassName}
    >
      <Input
        id={id}
        as={INPUT_ELEMENTS.TEXTAREA}
        variant={INPUT_TRIGGER_VARIANTS.TEXTAREA}
        value={inputValue}
        name={name}
        onChange={onChangeTextArea}
        required={required}
        readOnly={readOnly}
        disabled={disabled}
        isFocused={isFocused}
        setIsFocused={setIsFocused}
        className={clsx(className, 'flex-col')}
        inputClassName='resize-none h-full'
        addonEnd={
          maxLength && (
            <Typography
              variant='body-12-m'
              color='gray-03'
              className='absolute bottom-[0.312rem] right-[0.687rem]'
            >
              <Typography variant='body-12-m' as='strong' color='gray-07'>
                {String(inputValue).length}
              </Typography>
              {`/${maxLength}`}
            </Typography>
          )
        }
        {...rest}
      />
    </InputBase>
  );
};

export default TextArea;
