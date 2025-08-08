import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { Typography } from '@/components/Typography';
import { InputLabelTextProps } from '@/components/shared/components/InputLabel/types';

const InputLabelText = ({
  id,
  badge,
  required,
  className,
  hidden,
  children,
}: PropsWithChildren<InputLabelTextProps>) => {
  return (
    <Typography
      id={id}
      className={clsx(
        className,
        'mb-0.5',
        badge && 'flex items-center gap-x-0.5',
        required && 'before:text-in-primary-06 before:content-["*"]',
      )}
      hidden={hidden}
      color='gray-07'
      variant='body-14-m'
    >
      {children}
      {badge && badge}
    </Typography>
  );
};

export default InputLabelText;
