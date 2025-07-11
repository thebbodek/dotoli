import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { ALERT_THEME_STYLES } from '@/components/Alert/constants';
import { useAlertContext } from '@/components/Alert/context';
import { AlertBoxProps } from '@/components/Alert/types';

const AlertBox = ({
  children,
  className,
}: PropsWithChildren<AlertBoxProps>) => {
  const { theme, useTitle, collapsible, collapsed } = useAlertContext();
  const useCollapse = useTitle && collapsible;

  return (
    <div
      role='alert'
      className={clsx(
        className,
        'in-flex-v-stack rounded-in-8 items-start gap-x-1.5 break-keep px-4',
        useTitle ? 'py-[0.875rem]' : 'h-10 justify-center',
        ALERT_THEME_STYLES[theme].root,
        useCollapse && [
          'transition-[max-height] duration-150 ease-out',
          collapsed ? 'max-h-[3.375rem]' : 'max-h-[100svh]',
        ],
      )}
      aria-expanded={useCollapse ? !collapsed : undefined}
    >
      {children}
    </div>
  );
};

export default AlertBox;
