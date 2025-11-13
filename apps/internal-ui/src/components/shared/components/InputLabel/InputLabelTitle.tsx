import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { InputLabelTextProps } from '@/components/shared/components/InputLabel/types';
import { Typography } from '@/components/Typography';

const InputLabelText = ({
  id,
  badge,
  required,
  className,
  children,
}: PropsWithChildren<InputLabelTextProps>) => {
  return (
    <Typography
      className={clsx(
        className,
        'mb-0.5',
        badge ? 'in-flex-h-stack items-center gap-x-0.5' : 'inline-block',
        required && 'before:text-in-primary-06 before:content-["*"]',
      )}
      color='gray-07'
      id={id}
      variant='body-14-m'
    >
      {children}
      {badge && badge}
    </Typography>
  );
};

export default InputLabelText;
