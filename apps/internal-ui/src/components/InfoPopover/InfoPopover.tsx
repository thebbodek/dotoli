import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { InfoPopoverProps } from './types';
import InfoPopoverDescription from '@/components/InfoPopover/InfoPopoverDescription';
import { Popover } from '@/components/Popover';
import { Typography } from '@/components/Typography';

const InfoPopover = ({
  title,
  children,
  className,
  innerClassName,
  ...popoverProps
}: PropsWithChildren<InfoPopoverProps>) => {
  return (
    <Popover {...popoverProps}>
      <div className={clsx(className, 'shadow-in-4 rounded-in-8 bg-in-white')}>
        <header className='border-in-gray-01 border-b py-2.5 pl-4 pr-5'>
          <Typography as='strong' color='black' variant='body-14-b'>
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
