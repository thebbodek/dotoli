import clsx from 'clsx';

import { Icon } from '@/components/Icon';
import { ConfirmOverlayContentProps } from '@/components/shared/components/ConfirmOverlay/types';
import OverlayDescription from '@/components/shared/components/Overlay/OverlayDescription';
import OverlayTitle from '@/components/shared/components/Overlay/OverlayTitle';
import { COLOR_STYLES_MAPPER, COLOR_VARIANTS } from '@/variants';

const ConfirmOverlayContent = ({
  useIcon = false,
  iconOptions = {},
  title,
  description,
}: ConfirmOverlayContentProps) => {
  const {
    color = COLOR_VARIANTS.PRIMARY_04,
    backgroundColor = COLOR_VARIANTS.PRIMARY_01,
    iconKey = 'exclamation-mark',
  } = iconOptions;

  return (
    <>
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
      <OverlayDescription description={description} className='text-center' />
    </>
  );
};

export default ConfirmOverlayContent;
