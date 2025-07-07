import clsx from 'clsx';
import { CSSProperties, useState } from 'react';

import {
  TAB_INDICATOR_VARIANT_STYLES,
  TAB_THEME_STYLES,
} from '@/components/Tab/constants';
import { useTabContext } from '@/components/Tab/context';
import useTabIndicatorStyleEffect from '@/components/Tab/hooks/effects/useTabIndicatorStyleEffect';

const TabIndicator = () => {
  const { theme, variant } = useTabContext();
  const [style, setStyle] = useState<CSSProperties>({});

  useTabIndicatorStyleEffect({ setStyle });

  return (
    <div
      className={clsx(
        'absolute left-0 transition-transform will-change-transform',
        TAB_INDICATOR_VARIANT_STYLES[variant],
        TAB_THEME_STYLES[theme][variant].indicator,
      )}
      style={style}
      aria-hidden
    />
  );
};

export default TabIndicator;
