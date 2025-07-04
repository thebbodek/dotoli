import { PropsWithChildren } from 'react';

import { Icon } from '@/components/Icon';
import { SelectBaseFeedbackProps } from '@/components/Select/shared/types';
import { Typography } from '@/components/Typography';

const SelectBaseFeedback = ({
  id,
  children,
}: PropsWithChildren<SelectBaseFeedbackProps>) => {
  return (
    <Typography
      id={id}
      className='mt-1.5 flex items-baseline gap-x-0.5 break-all'
      color='red-04'
      variant='body-12-m'
      aria-live='assertive'
    >
      <Icon
        iconKey='info'
        weight='fill'
        className='text-in-red-04 translate-y-[0.083em]'
        aria-hidden
      />
      {children}
    </Typography>
  );
};

export default SelectBaseFeedback;
