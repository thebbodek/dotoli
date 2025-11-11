import { IconButton } from '@/components/Button';
import { OverlayHeader, OverlayTitle } from '@/components/shared';
import { FullScreenDialogHeaderProps } from './types';

const FullScreenDialogHeader = ({
  title,
  onClose,
  isPending,
}: FullScreenDialogHeaderProps) => {
  return (
    <OverlayHeader className='in-flex-h-stack items-center px-5 py-3'>
      <IconButton
        iconKey='x'
        aria-label={'닫기'}
        onClick={onClose}
        theme='hover-white'
        disabled={isPending}
      />
      <OverlayTitle variant={'body-16-b'} title={title} />
    </OverlayHeader>
  );
};

export default FullScreenDialogHeader;
