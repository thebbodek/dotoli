import { FileUploaderProps } from '@/components/FileUploader/types';
import { Typography } from '@/components/Typography';

const FileUploaderDescription = ({
  accept,
  max,
}: Required<Pick<FileUploaderProps, 'accept' | 'max'>>) => {
  return (
    <Typography className='text-center' color='gray-05' variant='body-12-m'>
      확장자: {accept.join(', ')}
      <br />
      업로드 용량: {max}MB
    </Typography>
  );
};

export default FileUploaderDescription;
