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
  const themeStyle = TAB_THEME_STYLES[theme][variant];

  return (
    <Typography
      className={clsx('group-disabled:text-in-gray-03', themeStyle.number)}
      color='gray-04'
      variant={TAB_NUMBER_TYPOGRAPHY_VARIANT[variant]}
    >
      {children}
    </Typography>
  );
};

export default TabNumber;
