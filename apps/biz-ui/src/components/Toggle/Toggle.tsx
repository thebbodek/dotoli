import clsx from 'clsx';

import { TOUCH_TARGET_STYLE } from '@/components/shared/constants';
import { TOGGLE_LABEL_STYLE } from '@/components/Toggle/constants';
import ToggleBase from '@/components/Toggle/ToggleBase';
import ToggleTrack from '@/components/Toggle/ToggleTrack';
import { ToggleProps } from '@/components/Toggle/types';

const Toggle = ({ className, ...props }: ToggleProps) => {
  const { checked } = props;

  return (
    <ToggleBase
      {...props}
      className={clsx(className, TOGGLE_LABEL_STYLE, TOUCH_TARGET_STYLE)}
    >
      <ToggleTrack checked={checked} />
    </ToggleBase>
  );
};

export default Toggle;
