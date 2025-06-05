import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { ModalProps } from '@/components/Modal/shared/types';
import Overlay from '@/components/shared/components/Overlay/Overlay';
import { OVERLAY_VARIANTS } from '@/components/shared/components/Overlay/constants';

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
