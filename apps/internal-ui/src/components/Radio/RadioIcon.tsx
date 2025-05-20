import clsx from 'clsx';

import {
  RADIO_ICON_SIZE_STYLES_MAPPER,
  RADIO_STYLES_MAPPER,
} from '@/components/Radio/constants';
import { RadioIconProps } from '@/components/Radio/types';

const RadioIcon = ({ size }: RadioIconProps) => {
  return (
    <div
      className={clsx(
        'relative flex items-center justify-center overflow-hidden rounded-full border-[0.125rem] before:rounded-full',
        RADIO_ICON_SIZE_STYLES_MAPPER[size],
        ...Object.values(RADIO_STYLES_MAPPER).map(({ icon }) => icon),
      )}
      aria-hidden
    />
  );
};

export default RadioIcon;
