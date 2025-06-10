import { ConfirmOverlayDescriptionProps } from '@/components/shared/components/ConfirmOverlay/types';
import OverlayDescription from '@/components/shared/components/Overlay/OverlayDescription';

const ConfirmOverlayDescription = ({
  description,
}: ConfirmOverlayDescriptionProps) => {
  return (
    <OverlayDescription
      description={description}
      className='mt-2 text-center'
    />
  );
};

export default ConfirmOverlayDescription;
