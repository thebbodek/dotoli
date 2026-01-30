import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { InputLabelTextProps } from '@/components/shared/components/InputLabel/types';
import { Typography } from '@/components/Typography';

const InputLabelText = ({
  id,
  required,
  className,
  children,
}: PropsWithChildren<InputLabelTextProps>) => {
  return (
    <Typography
      className={clsx(
        className,
        required && 'before:text-in-primary-06 before:content-["*"]',
      )}
      color='gray-07'
      id={id}
      variant='body-14-m'
    >
      {children}
    </Typography>
  );
};

export default InputLabelText;
