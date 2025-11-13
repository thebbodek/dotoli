import clsx from 'clsx';

import { InfoModalProps } from '@/components/Modal/InfoModal/types';
import { Modal } from '@/components/Modal/shared';
import { OverlayDescription, OverlayTitle } from '@/components/shared';

const InfoModal = ({
  ref,
  isOpen,
  title,
  children,
  confirmOption,
  cancelOption = { label: '닫기' },
  isLoading,
  className,
}: InfoModalProps) => {
  return (
    <Modal className={clsx(className, 'pt-5')} isOpen={isOpen} ref={ref}>
      <Modal.ContentWrapper isLoading={isLoading}>
        <header className='mb-5'>
          <OverlayTitle title={title} />
        </header>
        {children}
      </Modal.ContentWrapper>
      <Modal.Footer
        cancelOption={cancelOption}
        confirmOption={confirmOption}
        possibleConfirm
      />
    </Modal>
  );
};

export default InfoModal;

InfoModal.displayName = 'InfoModal';
InfoModal.Description = OverlayDescription;
