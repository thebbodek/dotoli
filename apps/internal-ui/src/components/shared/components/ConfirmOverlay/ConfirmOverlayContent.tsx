import clsx from 'clsx';

import { Icon } from '@/components/Icon';
import { ConfirmOverlayContentProps, OverlayTitle } from '@/components/shared';
import { COLOR_STYLES_MAPPER, COLOR_VARIANTS } from '@/variants';

const ConfirmOverlayContent = ({
  useIcon = false,
  iconOptions = {},
  title,
}: ConfirmOverlayContentProps) => {
  const {
    color = COLOR_VARIANTS.PRIMARY_04,
    backgroundColor = COLOR_VARIANTS.PRIMARY_01,
    iconKey = 'exclamation-mark',
  } = iconOptions;

  return (
    <div className='flex-v-stack-center gap-y-2'>
      {useIcon && (
        <Icon
          iconKey={iconKey}
          className={clsx(
            COLOR_STYLES_MAPPER.TEXT[color],
            COLOR_STYLES_MAPPER.BACKGROUND[backgroundColor],
            'mb-1 h-[3.25rem] w-[3.25rem] rounded-full text-[2.125rem]',
          )}
        />
      )}
      <OverlayTitle title={title} className='text-center' />
    </div>
  );
};

export default ConfirmOverlayContent;
