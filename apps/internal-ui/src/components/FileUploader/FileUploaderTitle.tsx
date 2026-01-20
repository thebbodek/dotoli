import { FileUploaderProps } from '@/components/FileUploader/types';
import { Icon } from '@/components/Icon';
import { Typography } from '@/components/Typography';

const FileUploaderTitle = ({
  disabled,
}: Pick<FileUploaderProps, 'disabled'>) => {
  return (
    <Typography
      className='mb-1 flex gap-x-1'
      color={disabled ? 'gray-05' : 'black'}
      variant='body-14-m'
    >
      <Icon iconKey='cloud-arrow-up' />
      <strong>파일 선택</strong> 또는 파일을 끌어오세요
    </Typography>
  );
};

export default FileUploaderTitle;
