import { FileUploaderDescriptionProps } from '@/components/FileUploader/types';
import { Typography } from '@/components/Typography';

const FileUploaderDescription = ({
  accept,
  max,
  description,
  disabled,
}: FileUploaderDescriptionProps) => {
  return (
    <>
      {description && (
        <Typography
          className='mb-0.5 text-center'
          color={disabled ? 'gray-05' : 'gray-07'}
          variant='body-12-m'
        >
          {description}
        </Typography>
      )}
      <Typography className='text-center' color='gray-05' variant='body-12-m'>
        용량: {max}MB | 확장자: {accept.join(', ')}
      </Typography>
    </>
  );
};

export default FileUploaderDescription;
