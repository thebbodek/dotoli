import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import {
  TAB_NUMBER_TYPOGRAPHY_VARIANT,
  TAB_THEME_STYLES,
} from '@/components/Tab/constants';
import { useTabContext } from '@/components/Tab/context';
import { Typography } from '@/components/Typography';

const TabNumber = ({ children }: PropsWithChildren) => {
  const { variant, theme } = useTabContext();

  return (
    <Typography
      variant={TAB_NUMBER_TYPOGRAPHY_VARIANT[variant]}
      color='gray-04'
      className={clsx(
        'group-disabled:text-in-gray-03',
        TAB_THEME_STYLES[theme][variant].number,
      )}
    >
      {children}
    </Typography>
  );
};

export default TabNumber;
