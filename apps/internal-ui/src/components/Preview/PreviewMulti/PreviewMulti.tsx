import { isMobile as getIsMobile } from '@bbodek/utils';
import dynamic from 'next/dynamic';

import { PreviewMultiProps } from '@/components/Preview/PreviewMulti/types';
import useFileDataCleanUpEffect from '@/components/Preview/shared/hooks/effects/useFileDataCleanUpEffect';
import { Overlay, OVERLAY_VARIANTS } from '@/components/shared';

const PreviewMultiMobile = dynamic(
  () => import('@/components/Preview/PreviewMulti/PreviewMultiMobile'),
  { ssr: false },
);

const PreviewMultiDesktop = dynamic(
  () => import('@/components/Preview/PreviewMulti/PreviewMultiDesktop'),
  { ssr: false },
);

const PreviewMulti = ({ isOpen, files, ...props }: PreviewMultiProps) => {
  const isMobile = getIsMobile();
  const variant = isMobile
    ? OVERLAY_VARIANTS.FULL_SCREEN
    : OVERLAY_VARIANTS.MODAL;

  const renderer = () => {
    if (isMobile) {
      return <PreviewMultiMobile {...props} files={files} />;
    }

    return <PreviewMultiDesktop {...props} files={files} />;
  };

  useFileDataCleanUpEffect({ files });

  return (
    <Overlay isOpen={isOpen} variant={variant} dimmed>
      {renderer()}
    </Overlay>
  );
};

export default PreviewMulti;
