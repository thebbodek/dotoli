import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { useSelectLabelContext } from '@/components/Select/shared/context/SelectLabelContext';
import { SelectBaseLabelProps } from '@/components/Select/shared/types';
import { Typography } from '@/components/Typography';

const SelectBaseLabel = ({
  children,
  badge,
}: PropsWithChildren<SelectBaseLabelProps>) => {
  const { id, required } = useSelectLabelContext();

  return (
    <Typography
      id={id}
      as='span'
      className={clsx(
        'mb-0.5',
        badge && 'flex items-center gap-x-0.5',
        required && 'before:text-in-primary-06 before:content-["*"]',
      )}
      color='gray-07'
      variant='body-14-m'
    >
      {children}
      {badge && badge}
    </Typography>
  );
};

export default SelectBaseLabel;
