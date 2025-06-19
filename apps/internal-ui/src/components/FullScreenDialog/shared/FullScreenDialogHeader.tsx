import { IconButton } from '@/components/Button';
import { OverlayTitle } from '@/components/shared';
import { FullScreenDialogHeaderProps } from './types';

const FullScreenDialogHeader = ({
  title,
  onCancel,
  isPending,
}: FullScreenDialogHeaderProps) => {
  return (
    <header className='border-gray-02 flex-h-stack items-center border-b px-5 py-3'>
      <IconButton
        iconKey='x'
        arialLabel={'닫기'}
        onClick={onCancel}
        theme='white'
        disabled={isPending}
      />
      <OverlayTitle variant={'body-16-b'} title={title} />
    </header>
  );
};

export default FullScreenDialogHeader;
