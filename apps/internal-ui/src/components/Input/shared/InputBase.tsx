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
  isFocused,
  badge,
  children,
  className,
  onSubmit,
}: PropsWithChildren<InputBaseProps>) => {
  const rootClassName = clsx(
    className,
    'has-[.input:focus]:group-focus group flex flex-col',
    error && 'group-error',
  );

  const render = (
    <>
      {label && (
        <label
          htmlFor={id}
          className='text-body-14-m text-gray-06 mb-0.5 flex gap-x-0.5'
        >
          {required && (
            <Typography variant='body-14-m' color='primary-05'>
              *
            </Typography>
          )}
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
            'text-body-14-m text-primary-05 group-[.group-error]:text-red-05 mt-1.5 flex gap-x-0.5 group-[.group-focus]:block',
            !!value && !error && !isFocused && 'hidden',
          )}
        >
          <Icon iconKey='info' weight='fill' className='text-body-[0.75rem]' />
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
