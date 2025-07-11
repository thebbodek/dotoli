import clsx from 'clsx';

import { ALERT_THEME_STYLES } from '@/components/Alert/constants';
import { useAlertContext } from '@/components/Alert/context/AlertContext';
import { AlertIconProps } from '@/components/Alert/types';
import { Icon } from '@/components/Icon';

const AlertIcon = ({ iconOption }: AlertIconProps) => {
  const { theme, useTitle } = useAlertContext();

  return (
    <Icon
      className={clsx(
        ALERT_THEME_STYLES[theme].icon,
        useTitle ? 'text-[1.25rem]' : 'text-[1.125rem]',
      )}
      iconKey={iconOption?.iconKey ?? 'info'}
      weight='fill'
    />
  );
};

export default AlertIcon;
