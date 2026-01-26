import clsx from 'clsx';
import { CSSProperties, HTMLAttributes } from 'react';

import { Icon } from '@/components/Icon';
import { Typography } from '@/components/Typography';

const PreviewLoading = ({
  width,
  height,
  className,
}: Pick<CSSProperties, 'width' | 'height'> &
  Pick<HTMLAttributes<HTMLDivElement>, 'className'>) => {
  return (
    <div
      className={clsx(
        className,
        'in-flex-v-stack-center bg-in-gray-09 gap-y-5',
      )}
      style={{ width, height }}
    >
      <Icon
        className='text-in-primary-05 animate-spin text-[3.25rem]'
        iconKey='circle-notch'
      />
      <Typography
        as='p'
        className='text-center'
        color='white'
        variant='body-16-r'
      >
        이미지를 불러오고 있습니다.
        <br />
        잠시만 기다려주세요.
      </Typography>
    </div>
  );
};

export default PreviewLoading;
