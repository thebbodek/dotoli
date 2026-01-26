import clsx from 'clsx';
import { cloneElement } from 'react';

import { IconButton } from '@/components/Button';
import { Flex } from '@/components/Flex';
import { PreviewHeaderProps } from '@/components/Preview/shared/components/Preview/types';
import { Typography } from '@/components/Typography';

const PreviewHeader = ({
  titleId,
  fileName,
  badge,
  closeOption,
  className,
}: PreviewHeaderProps) => {
  const {
    iconKey = 'x',
    'aria-label': ariaLabel = '닫기',
    onClose,
  } = closeOption;

  return (
    <header className={clsx(className, 'in-flex-h-stack items-center')}>
      <Flex
        align={{ items: 'center' }}
        className='max-w-[calc(100%-2rem)]'
        gap={{ row: '6' }}
      >
        {badge && cloneElement(badge, { className: 'shrink-0' })}
        <Typography
          as='strong'
          className='truncate break-all'
          color='white'
          id={titleId}
          variant='body-14-r'
        >
          {fileName}
        </Typography>
      </Flex>
      <IconButton
        aria-label={ariaLabel}
        className='shrink-0'
        iconKey={iconKey}
        theme='white'
        onClick={onClose}
      />
    </header>
  );
};

export default PreviewHeader;
