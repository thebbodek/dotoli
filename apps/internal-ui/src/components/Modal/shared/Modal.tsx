import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import ModalContentWrapper from '@/components/Modal/shared/ModalContentWrapper';
import ModalFooter from '@/components/Modal/shared/ModalFooter';
import { ModalProps } from '@/components/Modal/shared/types';
import { Overlay, OVERLAY_VARIANTS } from '@/components/shared';

const Modal = ({
  isOpen,
  ref,
  children,
  className,
}: PropsWithChildren<ModalProps>) => {
  return (
    <Overlay isOpen={isOpen} ref={ref} variant={OVERLAY_VARIANTS.MODAL} dimmed>
      <div
        className={clsx(
          className,
          'rounded-in-16 shadow-in-24 animate-in-popup bg-in-white px-[1.875rem] pb-6',
        )}
      >
        {children}
      </div>
    </Overlay>
  );
};

export default Modal;

Modal.displayName = 'Modal';
Modal.ContentWrapper = ModalContentWrapper;
Modal.Footer = ModalFooter;
