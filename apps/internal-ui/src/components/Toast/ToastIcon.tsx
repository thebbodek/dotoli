import clsx from 'clsx';

import { Icon } from '@/components/Icon';
import { TOAST_TYPE_ICON_PROPS } from '@/components/Toast/constants';
import { ToastProps } from '@/components/Toast/types';

const ToastIcon = ({ type }: Required<Pick<ToastProps, 'type'>>) => {
  const { iconKey, color } = TOAST_TYPE_ICON_PROPS[type];

  return (
    <Icon
      className={clsx(color, 'h-[1.312rem] shrink-0')}
      iconKey={iconKey}
      weight='fill'
    />
  );
};

export default ToastIcon;
