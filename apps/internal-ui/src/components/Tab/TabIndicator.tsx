import clsx from 'clsx';
import { CSSProperties, useState } from 'react';

import {
  TAB_INDICATOR_VARIANT_STYLES,
  TAB_THEME_STYLES,
} from '@/components/Tab/constants';
import useTabIndicatorStyleEffect from '@/components/Tab/hooks/effects/useTabIndicatorStyleEffect';
import { TabIndicatorProps } from '@/components/Tab/types';

const TabIndicator = ({
  tabRefs,
  currentValue,
  theme,
  variant,
}: TabIndicatorProps) => {
  const [style, setStyle] = useState<CSSProperties>({});

  useTabIndicatorStyleEffect({ tabRefs, currentValue, setStyle });

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
