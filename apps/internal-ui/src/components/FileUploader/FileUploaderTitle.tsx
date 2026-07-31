import { FILE_UPLOADER_PENDING_ICON_KEY } from '@/components/FileUploader/constants';
import { FileUploaderTitleProps } from '@/components/FileUploader/types';
import { Icon } from '@/components/Icon';
import { Typography } from '@/components/Typography';

const FileUploaderTitle = ({ disabled, isPending }: FileUploaderTitleProps) => {
  if (isPending) {
    return (
      <>
        <Icon
          className='text-in-gray-05 mb-0.5 animate-spin text-[1.3125rem]'
          iconKey={FILE_UPLOADER_PENDING_ICON_KEY}
        />
        <Typography className='mb-0.5' color='gray-05' variant='body-12-m'>
          업로드 중입니다
        </Typography>
      </>
    );
  }

  return (
    <Typography
      className='mb-0.5 flex gap-x-1'
      color={disabled ? 'gray-05' : 'black'}
      variant='body-14-m'
    >
      <Icon iconKey='cloud-arrow-up' />
      <strong>파일 선택</strong> 또는 파일을 끌어오세요
    </Typography>
  );
};

export default FileUploaderTitle;
