import clsx from 'clsx';
import dynamic from 'next/dynamic';

import { PreviewMultiProps } from '@/components/Preview/PreviewMulti/types';
import { usePreviewMulti } from '@/components/Preview/shared';
import {
  PREVIEW_RESPONSE_STYLES,
  PreviewThumbnails,
  PreviewWrapper,
} from '@/components/Preview/shared/components';
import PreviewOverlayWrapper from '@/components/Preview/shared/components/PreviewOverlayWrapper';

const PreviewMultiMobileViewer = dynamic(
  () => import('@/components/Preview/PreviewMulti/PreviewMultiMobileViewer'),
  { ssr: false },
);

const PreviewMultiMobile = ({
  files,
  initialFile,
  isLoading,
  className,
  onClose,
}: Omit<PreviewMultiProps, 'isOpen'>) => {
  const {
    models: { previewId, currentFile },
    operations: { onChange },
  } = usePreviewMulti({ files, initialFile });

  const renderer = () => {
    if (!currentFile) return null;

    const { badge, ...file } = currentFile;

    return (
      <PreviewMultiMobileViewer
        badge={badge}
        closeOption={{ onClose }}
        file={file}
        id={previewId}
        isLoading={isLoading}
      />
    );
  };

  return (
    <PreviewOverlayWrapper>
      <PreviewWrapper
        className={clsx(className, PREVIEW_RESPONSE_STYLES.MOBILE.CONTAINER)}
      >
        {renderer()}
        <PreviewThumbnails
          className='in-flex-h-stack mx-3 my-[0.875rem] gap-x-1.5 overflow-x-auto'
          currentFile={currentFile}
          disabled={isLoading}
          files={files}
          previewId={previewId}
          onChange={onChange}
        />
      </PreviewWrapper>
    </PreviewOverlayWrapper>
  );
};

export default PreviewMultiMobile;
