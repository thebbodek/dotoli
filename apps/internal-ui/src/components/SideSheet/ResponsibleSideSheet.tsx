import { RESPONSIBLE_STATUS, useResponsible } from '@bbodek/hooks';
import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react';

import SideSheet from '@/components/SideSheet/SideSheet';
import { ResponsibleSideSheetProps } from '@/components/SideSheet/types';

const SideSheetFullScreenDialog = dynamic(
  () => import('@/components/SideSheet/SideSheetFullScreenDialog'),
  { ssr: false },
);

const ResponsibleSideSheet = ({
  containerId,
  title = '',
  children,
  ...props
}: PropsWithChildren<ResponsibleSideSheetProps>) => {
  const { status } = useResponsible();
  const isMobile = status === RESPONSIBLE_STATUS.MOBILE;

  if (isMobile) {
    return (
      <SideSheetFullScreenDialog {...props} title={title}>
        {children}
      </SideSheetFullScreenDialog>
    );
  }

  return (
    <SideSheet containerId={containerId} title={title} {...props}>
      {children}
    </SideSheet>
  );
};

export default ResponsibleSideSheet;
