import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import ModalFooter from '@/components/Modal/shared/ModalFooter';
import { ModalProps } from '@/components/Modal/shared/types';
import { Overlay, OVERLAY_VARIANTS } from '@/components/shared';
import ModalContentWrapper from '@/components/Modal/shared/ModalContentWrapper';

const Modal = ({
  isOpen,
  ref,
  children,
  className,
}: PropsWithChildren<ModalProps>) => {
  return (
    <Overlay ref={ref} variant={OVERLAY_VARIANTS.MODAL} isOpen={isOpen} dimmed>
      <div
        className={clsx(
          className,
          'rounded-16 shadow-24 animate-popup bg-white px-[1.875rem] pb-6',
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
