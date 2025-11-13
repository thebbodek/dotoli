import clsx from 'clsx';

import { ConfirmOverlayContentProps } from './types';
import { Icon } from '@/components/Icon';
import { OverlayTitle } from '@/components/shared/components/Overlay';
import { COLOR_STYLES_MAPPER, COLOR_VARIANTS } from '@/variants';

const ConfirmOverlayContent = ({
  useIcon = false,
  iconOption = {},
  title,
}: ConfirmOverlayContentProps) => {
  const {
    color = COLOR_VARIANTS.PRIMARY_04,
    backgroundColor = COLOR_VARIANTS.PRIMARY_01,
    iconKey = 'exclamation-mark',
  } = iconOption;

  return (
    <div className='in-flex-v-stack-center gap-y-2'>
      {useIcon && (
        <Icon
          iconKey={iconKey}
          className={clsx(
            COLOR_STYLES_MAPPER.TEXT[color],
            COLOR_STYLES_MAPPER.BACKGROUND[backgroundColor],
            'rounded-in-full mb-1 h-[3.25rem] w-[3.25rem] text-[2.125rem]',
          )}
        />
      )}
      <OverlayTitle title={title} className='text-center' />
    </div>
  );
};

export default ConfirmOverlayContent;
