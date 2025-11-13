import { PropsWithChildren } from 'react';

import { ModalContentWrapperProps } from '@/components/Modal/shared/types';
import { OverlayContentWrapper } from '@/components/shared';

const ModalContentWrapper = ({
  children,
  isLoading,
}: PropsWithChildren<ModalContentWrapperProps>) => {
  return (
    <OverlayContentWrapper className='mb-6' isLoading={isLoading}>
      {children}
    </OverlayContentWrapper>
  );
};

export default ModalContentWrapper;
