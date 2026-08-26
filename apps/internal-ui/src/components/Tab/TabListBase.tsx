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
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus -- 포커스는 roving tabIndex로 개별 탭이 받고, tablist는 키 이벤트 버블링만 처리
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
