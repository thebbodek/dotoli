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
        'rounded-in-full before:rounded-in-full relative flex items-center justify-center overflow-hidden p-[0.125rem] transition-[background-color] before:absolute before:transition-[translate]',
        TOGGLE_ICON_SIZE_STYLES[size],
        ...Object.values(TOGGLE_STYLES).map(({ icon }) => icon),
      )}
      aria-hidden
    />
  );
};

export default ToggleIcon;
