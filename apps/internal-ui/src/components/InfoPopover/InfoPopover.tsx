import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import InfoPopoverDescription from '@/components/InfoPopover/InfoPopoverDescription';
import { Popover } from '@/components/Popover';
import { Typography } from '@/components/Typography';
import { InfoPopoverProps } from './types';

const InfoPopover = ({
  title,
  children,
  className,
  innerClassName,
  ...popoverProps
}: PropsWithChildren<InfoPopoverProps>) => {
  return (
    <Popover {...popoverProps}>
      <div className={clsx(className, 'shadow-4 rounded-8 bg-white')}>
        <header className='border-gray-01 border-b py-2.5 pl-4 pr-5'>
          <Typography as='strong' variant='body-14-b'>
            {title}
          </Typography>
        </header>
        <div className={clsx('p-4', innerClassName)}>{children}</div>
      </div>
    </Popover>
  );
};

export default InfoPopover;

InfoPopover.displayName = 'InfoPopover';
InfoPopover.Description = InfoPopoverDescription;
