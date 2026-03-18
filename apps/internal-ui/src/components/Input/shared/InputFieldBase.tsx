import clsx from 'clsx';
import { PropsWithChildren, useId } from 'react';

import { InputFieldBaseProvider } from '@/components/Input/shared/context/InputFieldBaseProvider';
import { InputFieldBaseProps } from '@/components/Input/shared/types';
import { InputFeedback } from '@/components/shared';

const InputFieldBase = ({
  label,
  hiddenLabel,
  required = false,
  isError = false,
  children,
  disabled = false,
  feedback = '',
  onChange,
}: PropsWithChildren<InputFieldBaseProps>) => {
  const feedbackId = useId();

  return (
    <fieldset className='in-flex-h-stack gap-1'>
      <legend
        className={clsx(
          'text-in-gray-06 body-14-m',
          required && 'before:text-in-primary-06 before:content-["*"]',
          hiddenLabel && 'sr-only',
        )}
      >
        {label}
      </legend>
      <InputFieldBaseProvider
        disabled={disabled}
        feedbackId={feedbackId}
        isError={isError}
        onChange={onChange}
      >
        {children}
      </InputFieldBaseProvider>
      {isError && (
        <InputFeedback className='flex' feedback={feedback} id={feedbackId} />
      )}
    </fieldset>
  );
};

export default InputFieldBase;
