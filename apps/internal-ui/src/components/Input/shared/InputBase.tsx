import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { Icon } from '@/components/Icon';
import { InputBaseProps } from '@/components/Input/shared/types';
import { Typography } from '@/components/Typography';

const InputBase = ({
  id,
  value,
  label,
  feedback,
  error = false,
  required = false,
  badge,
  children,
  className,
  onSubmit,
}: PropsWithChildren<InputBaseProps>) => {
  const isEmpty = !value || value.replaceAll(' ', '').length <= 0;
  const isValidInput = !isEmpty && !error;
  const rootClassName = clsx(
    className,
    'flex-v-stack group',
    error && 'group-error',
  );

  const render = (
    <>
      {label && (
        <label
          htmlFor={id}
          className={clsx(
            'text-body-14-m text-gray-07 mb-0.5',
            badge && 'flex items-center gap-x-0.5',
            required && 'before:text-primary-06 before:content-["*"]',
          )}
        >
          {label}
          {badge && badge}
        </label>
      )}
      {children}
      {feedback && (
        <Typography
          variant='body-12-m'
          color='primary-05'
          className={clsx(
            'text-body-14-m text-primary-05 group-[.group-error]:text-red-04 mt-1.5 items-baseline gap-x-0.5 break-all',
            isValidInput ? 'hidden group-has-[.input:focus]:flex' : 'flex',
          )}
        >
          <Icon
            iconKey='info'
            weight='fill'
            className='translate-y-[0.083em]'
          />
          {feedback}
        </Typography>
      )}
    </>
  );

  if (onSubmit) {
    return (
      <form
        className={rootClassName}
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

  return <div className={rootClassName}>{render}</div>;
};

export default InputBase;
