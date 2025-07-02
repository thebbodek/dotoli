import clsx from 'clsx';

import {
  TAB_NUMBER_TYPOGRAPHY_VARIANT,
  TAB_THEME_STYLES,
} from '@/components/Tab/constants';
import { TabNumberProps } from '@/components/Tab/types';
import { Typography } from '@/components/Typography';

const TabNumber = ({ number, theme, variant }: TabNumberProps) => {
  return (
    <Typography
      variant={TAB_NUMBER_TYPOGRAPHY_VARIANT[variant]}
      color='gray-04'
      className={clsx(
        'group-disabled:text-gray-03',
        TAB_THEME_STYLES[theme][variant].number,
      )}
    >
      {number}
    </Typography>
  );
};

export default TabNumber;
