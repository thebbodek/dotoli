import clsx from 'clsx';

import { ACTION_CHIP_PRESSED_STYLE } from '@/components/Chip/ActionChip/constants';
import { ActionChipProps } from '@/components/Chip/ActionChip/types';
import {
  CHIP_BASE_STYLE,
  CHIP_DEFAULT_CONTAINER_STYLE,
} from '@/components/Chip/shared';
import { TOUCH_TARGET_NARROW_STYLE } from '@/components/shared/constants';

const ActionChip = ({ label, className, onClick, ref }: ActionChipProps) => {
  return (
    <button
      className={clsx(
        className,
        CHIP_BASE_STYLE,
        TOUCH_TARGET_NARROW_STYLE,
        CHIP_DEFAULT_CONTAINER_STYLE,
        ACTION_CHIP_PRESSED_STYLE,
      )}
      ref={ref}
      type='button'
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ActionChip;
