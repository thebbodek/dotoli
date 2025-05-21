import clsx from 'clsx';

import {
  TOGGLE_ICON_SIZE_STYLES,
  TOGGLE_STYLES,
} from '@/components/Toggle/constants';
import { ToggleIconProps } from '@/components/Toggle/types';

const ToggleIcon = ({ size }: ToggleIconProps) => {
  return (
    <div
      className={clsx(
        'relative flex items-center justify-center overflow-hidden rounded-full p-[0.125rem] transition-[background-color] before:absolute before:rounded-full before:transition-[translate]',
        TOGGLE_ICON_SIZE_STYLES[size],
        ...Object.values(TOGGLE_STYLES).map(({ icon }) => icon),
      )}
      aria-hidden
    />
  );
};

export default ToggleIcon;
