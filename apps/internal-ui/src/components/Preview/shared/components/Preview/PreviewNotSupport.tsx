import { fileDownload } from '@bbodek/utils';

import { Button } from '@/components/Button';
import { Flex } from '@/components/Flex';
import { Icon } from '@/components/Icon';
import { PreviewNotSupportProps } from '@/components/Preview/shared/components/Preview/types';
import { Typography } from '@/components/Typography';

const PreviewNotSupport = ({ downloadOptions }: PreviewNotSupportProps) => {
  return (
    <Flex align={{ items: 'center' }} direction='column'>
      <Icon
        className='rounded-in-full bg-in-gray-08 text-in-gray-06 h-[3.25rem] w-[3.25rem] text-[1.5rem]'
        iconKey='image'
      />
      <Typography
        as='p'
        className='mt-2.5 mb-5 text-center'
        color='white'
        variant='body-16-r'
      >
        미리보기를 지원하지 않는 확장자입니다
        <br />
        다운로드하여 확인해 주세요
      </Typography>
      <Button
        iconOption={{ iconKey: 'download-simple' }}
        label='다운로드'
        size='sm'
        theme='gray'
        variant='outlined'
        onClick={() => fileDownload(downloadOptions)}
      />
    </Flex>
  );
};

export default PreviewNotSupport;
