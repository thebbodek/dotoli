import clsx from 'clsx';

import {
  CHECKBOX_ICON_SIZE_STYLES,
  CHECKBOX_STYLES,
} from '@/components/Checkbox/constants';
import { CheckboxIconProps } from '@/components/Checkbox/types';
import { Icon } from '@/components/Icon';

const CheckboxIcon = ({ size }: CheckboxIconProps) => {
  return (
    <div
      className={clsx(
        'rounded-4 flex items-center justify-center overflow-hidden border-[0.125rem]',
        CHECKBOX_ICON_SIZE_STYLES[size],
        ...Object.values(CHECKBOX_STYLES).map(({ icon }) => icon),
      )}
      aria-hidden
    >
      <Icon className='text-white' iconKey='check' />
    </div>
  );
};

export default CheckboxIcon;
