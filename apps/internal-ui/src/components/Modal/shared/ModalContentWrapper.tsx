import { PropsWithChildren } from 'react';

import { ModalContentWrapperProps } from '@/components/Modal/shared/types';
import { OverlayContentWrapper } from '@/components/shared';

const ModalContentWrapper = ({
  children,
  isLoading,
}: PropsWithChildren<ModalContentWrapperProps>) => {
  return (
    <OverlayContentWrapper isLoading={isLoading} className={'mb-6'}>
      {children}
    </OverlayContentWrapper>
  );
};

export default ModalContentWrapper;
