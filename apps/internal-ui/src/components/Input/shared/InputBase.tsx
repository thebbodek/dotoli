import clsx from 'clsx';
import { FormEvent, PropsWithChildren, useId } from 'react';

import { InputProvider } from '@/components/Input/shared/context/InputContext';
import { InputBaseProps } from '@/components/Input/shared/types';
import { InputFeedback, InputLabel } from '@/components/shared';
import { InputWrapper } from '@/components/shared/components/InputWrapper';

const InputBase = ({
  id,
  value,
  label,
  hiddenLabel,
  feedback,
  isError = false,
  required = false,
  badge,
  children,
  className,
  onSubmit,
}: PropsWithChildren<InputBaseProps>) => {
  const feedbackId = useId();
  const isEmpty = !value || value.replaceAll(' ', '').length <= 0;
  const isValidInput = !isEmpty && !isError;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!onSubmit) return;

    e.preventDefault();
    e.currentTarget.reset();

    onSubmit(e);
  };

  return (
    <InputWrapper
      className={clsx(className, 'group')}
      onSubmit={onSubmit && handleSubmit}
    >
      <InputLabel
        htmlFor={id}
        badge={badge}
        required={required}
        hidden={hiddenLabel}
      >
        {label}
      </InputLabel>
      <InputProvider
        feedbackId={feedback ? feedbackId : undefined}
        isError={isError}
      >
        {children}
      </InputProvider>
      {feedback && (
        <InputFeedback
          id={feedbackId}
          feedback={feedback}
          theme={isError ? 'error' : 'info'}
          className={clsx(
            isValidInput ? 'hidden group-has-[.input:focus]:flex' : 'flex',
          )}
        />
      )}
    </InputWrapper>
  );
};

export default InputBase;
