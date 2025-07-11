import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { ALERT_THEME_STYLES } from '@/components/Alert/constants';
import { useAlertContext } from '@/components/Alert/context';
import { AlertBoxProps } from '@/components/Alert/types';

const AlertBox = ({
  children,
  className,
}: PropsWithChildren<AlertBoxProps>) => {
  const { theme, hasTitle, collapsible, collapsed } = useAlertContext();
  const useCollapse = hasTitle && collapsible;

  return (
    <div
      role='alert'
      className={clsx(
        className,
        'in-flex-v-stack rounded-in-8 items-start break-keep px-4',
        hasTitle ? 'py-[0.875rem]' : 'h-10 justify-center',
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
