import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { TAB_THEME_STYLES } from '@/components/Tab/constants';
import { useTabContext } from '@/components/Tab/context';
import { TabListBaseProps } from '@/components/Tab/types';
import { handleKeyDownFocus } from '@/components/shared';

const TabListBase = ({
  ariaLabel,
  children,
  className,
}: PropsWithChildren<TabListBaseProps>) => {
  const { theme, variant, tabRefs } = useTabContext();

  return (
    <div
      role='tablist'
      aria-label={ariaLabel}
      className={clsx(
        className,
        'group/tablist relative flex items-center',
        TAB_THEME_STYLES[theme][variant].list,
      )}
      onKeyDown={(e) => handleKeyDownFocus({ e, refs: tabRefs })}
    >
      {children}
    </div>
  );
};

export default TabListBase;
