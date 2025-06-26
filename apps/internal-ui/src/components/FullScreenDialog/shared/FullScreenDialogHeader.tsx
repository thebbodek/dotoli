import { IconButton } from '@/components/Button';
import { OverlayHeader, OverlayTitle } from '@/components/shared';
import { FullScreenDialogHeaderProps } from './types';

const FullScreenDialogHeader = ({
  title,
  onCancel,
  isPending,
}: FullScreenDialogHeaderProps) => {
  return (
    <OverlayHeader className='flex-h-stack items-center px-5 py-3'>
      <IconButton
        iconKey='x'
        arialLabel={'닫기'}
        onClick={onCancel}
        theme='hover-white'
        disabled={isPending}
      />
      <OverlayTitle variant={'body-16-b'} title={title} />
    </OverlayHeader>
  );
};

export default FullScreenDialogHeader;
