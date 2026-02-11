import { FILE_UPLOAD_STATES } from '@/components/File/constants';
import { Success } from '@/components/File/lotties';
import { FileProps } from '@/components/File/types';
import { Icon } from '@/components/Icon';
import { LottieAnimation } from '@/components/LottieAnimation';

const FileUploadStateIcon = ({ state }: Pick<FileProps, 'state'>) => {
  if (
    state === FILE_UPLOAD_STATES.DEFAULT ||
    state === FILE_UPLOAD_STATES.ERROR
  )
    return null;

  const renderer = () => {
    if (state === FILE_UPLOAD_STATES.SUCCESS) {
      return (
        <LottieAnimation animationData={Success} options={{ loop: false }} />
      );
    }

    if (state === FILE_UPLOAD_STATES.LOADING) {
      return (
        <Icon
          className='text-in-primary-05 animate-spin text-[1rem]'
          iconKey='circle-notch'
        />
      );
    }
  };

  return (
    <div className='in-flex-h-stack-center h-[2rem] w-[2rem]'>{renderer()}</div>
  );
};

export default FileUploadStateIcon;
