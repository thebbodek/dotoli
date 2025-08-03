import { PropsWithChildren } from 'react';

import { Typography } from '@/components/Typography';
import { TYPOGRAPHY_VARIANTS } from '@/variants';

const FilterSelectOptionLabels = ({ children }: PropsWithChildren) => {
  return (
    <Typography
      className='in-flex-h-stack bg-in-primary-02 rounded-in-4 mx-2 gap-x-1 overflow-hidden px-1'
      color='primary-05'
      variant={TYPOGRAPHY_VARIANTS.BODY_14_M}
    >
      {children}
    </Typography>
  );
};

export default FilterSelectOptionLabels;
