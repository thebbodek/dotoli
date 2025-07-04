import clsx from 'clsx';

import {
  RADIO_ICON_SIZE_STYLES,
  RADIO_STYLES,
} from '@/components/Radio/constants';
import { RadioIconProps } from '@/components/Radio/types';

const RadioIcon = ({ size }: RadioIconProps) => {
  return (
    <div
      className={clsx(
        'rounded-in-full before:rounded-in-full relative flex items-center justify-center overflow-hidden border-[0.125rem]',
        RADIO_ICON_SIZE_STYLES[size],
        ...Object.values(RADIO_STYLES).map(({ icon }) => icon),
      )}
      aria-hidden
    />
  );
};

export default RadioIcon;
