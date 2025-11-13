import { ConfirmOverlayDescriptionProps } from '@/components/shared/components/ConfirmOverlay/types';
import OverlayDescription from '@/components/shared/components/Overlay/OverlayDescription';

const ConfirmOverlayDescription = ({
  description,
}: ConfirmOverlayDescriptionProps) => {
  return (
    <OverlayDescription
      className='mt-2 text-center'
      description={description}
    />
  );
};

export default ConfirmOverlayDescription;
