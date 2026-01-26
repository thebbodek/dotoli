import { isMobile as getIsMobile } from '@bbodek/utils';
import dynamic from 'next/dynamic';

import { PreviewSingleProps } from '@/components/Preview/PreviewSingle/types';
import { useFileDataCleanUpEffect } from '@/components/Preview/shared';
import { Overlay, OVERLAY_VARIANTS } from '@/components/shared';

const PreviewSingleMobile = dynamic(
  () => import('@/components/Preview/PreviewSingle/PreviewSingleMobile'),
  { ssr: false },
);

const PreviewSingleDesktop = dynamic(
  () => import('@/components/Preview/PreviewSingle/PreviewSingleDesktop'),
  { ssr: false },
);

const PreviewSingle = ({ isOpen, file, ...props }: PreviewSingleProps) => {
  const isMobile = getIsMobile();
  const variant = isMobile
    ? OVERLAY_VARIANTS.FULL_SCREEN
    : OVERLAY_VARIANTS.MODAL;

  const renderer = () => {
    if (isMobile) {
      return <PreviewSingleMobile {...props} file={file} />;
    }

    return <PreviewSingleDesktop {...props} file={file} />;
  };

  useFileDataCleanUpEffect({ files: file ? [file] : [] });

  return (
    <Overlay isOpen={isOpen} variant={variant} dimmed>
      {renderer()}
    </Overlay>
  );
};

export default PreviewSingle;
