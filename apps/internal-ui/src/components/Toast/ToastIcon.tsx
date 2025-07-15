import clsx from 'clsx';

import { Icon } from '@/components/Icon';
import { TOAST_TYPE_ICON_PROPS } from '@/components/Toast/constants';
import { ToastProps } from '@/components/Toast/types';

const ToastIcon = ({ type }: Required<Pick<ToastProps, 'type'>>) => {
  const { iconKey, className } = TOAST_TYPE_ICON_PROPS[type];

  return (
    <Icon
      iconKey={iconKey}
      weight='fill'
      className={clsx(className, 'shrink-0')}
    />
  );
};

export default ToastIcon;
