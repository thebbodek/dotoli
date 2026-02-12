import { FullScreenDialogHeaderProps } from './types';
import { IconButton } from '@/components/Button';
import { OverlayHeader, OverlayTitle } from '@/components/shared';

const FullScreenDialogHeader = ({
  title,
  onClose,
  isPending,
}: FullScreenDialogHeaderProps) => {
  return (
    <OverlayHeader className='in-flex-h-stack shrink-0 items-center px-5 py-3'>
      <IconButton
        aria-label='닫기'
        disabled={isPending}
        iconKey='x'
        theme='hover-white'
        onClick={onClose}
      />
      <OverlayTitle title={title} variant='body-16-b' />
    </OverlayHeader>
  );
};

export default FullScreenDialogHeader;
