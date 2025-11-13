import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { handleKeyDownFocus } from '@/components/shared';
import { TAB_THEME_STYLES } from '@/components/Tab/constants';
import { useTabContext } from '@/components/Tab/context';
import { TabListBaseProps } from '@/components/Tab/types';

const TabListBase = ({
  'aria-label': ariaLabel,
  children,
  className,
}: PropsWithChildren<TabListBaseProps>) => {
  const { theme, variant, tabRefs } = useTabContext();
  const themeStyle = TAB_THEME_STYLES[theme][variant];

  return (
    <div
      className={clsx(
        className,
        'group/tablist relative flex items-center',
        themeStyle.list,
      )}
      aria-label={ariaLabel}
      role='tablist'
      onKeyDown={(e) => handleKeyDownFocus({ e, refs: tabRefs })}
    >
      {children}
    </div>
  );
};

export default TabListBase;
