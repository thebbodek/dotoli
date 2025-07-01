import clsx from 'clsx';
import { PropsWithChildren, useId } from 'react';

import { InputBaseProps } from '@/components/Input/shared/types';
import { InputFeedback, InputLabel } from '@/components/shared';
import { InputProvider } from '@/components/Input/shared/context/InputContext';

const InputBase = ({
  id,
  value,
  label,
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

  const render = (
    <>
      {label && (
        <InputLabel htmlFor={id} badge={badge} required={required}>
          {label}
        </InputLabel>
      )}
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
    </>
  );

  if (onSubmit) {
    return (
      <form
        className={className}
        onSubmit={(e) => {
          e.preventDefault();
          e.currentTarget.reset();

          onSubmit?.(e);
        }}
      >
        {render}
      </form>
    );
  }

  return <div className={className}>{render}</div>;
};

export default InputBase;
