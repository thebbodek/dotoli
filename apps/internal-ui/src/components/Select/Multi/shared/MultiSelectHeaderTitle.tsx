import { PropsWithChildren } from 'react';

import { Typography } from '@/components/Typography';
import { TYPOGRAPHY_VARIANTS } from '@/variants';

const MultiSelectHeaderTitle = ({ children }: PropsWithChildren) => {
  return (
    <Typography
      as='strong'
      className='mr-auto'
      color='black'
      variant={TYPOGRAPHY_VARIANTS.BODY_16_B}
    >
      {children}
    </Typography>
  );
};

export default MultiSelectHeaderTitle;
