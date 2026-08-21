import clsx from 'clsx';
import { PropsWithChildren, useId } from 'react';

import { InputFieldBaseProvider } from '@/components/Input/shared/context/InputFieldBaseContext';
import { InputFieldBaseProps } from '@/components/Input/shared/types';
import { InputFeedback, InputLabel } from '@/components/shared';

const InputFieldBase = ({
  label,
  hiddenLabel,
  required = false,
  isError = false,
  children,
  disabled = false,
  feedback = '',
  className,
  onChange,
}: PropsWithChildren<InputFieldBaseProps>) => {
  const feedbackId = useId();

  return (
    <fieldset className={clsx(className, 'in-flex-v-stack gap-y-0.5')}>
      <legend className='sr-only'>{label}</legend>
      <InputLabel hidden={hiddenLabel} required={required} aria-hidden>
        {label}
      </InputLabel>
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
