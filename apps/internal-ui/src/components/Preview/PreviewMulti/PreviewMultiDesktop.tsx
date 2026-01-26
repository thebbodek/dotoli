import clsx from 'clsx';
import dynamic from 'next/dynamic';

import { PreviewMultiProps } from '@/components/Preview/PreviewMulti/types';
import {
  PREVIEW_RESPONSE_STYLES,
  PreviewMultiController,
  PreviewOverlayWrapper,
  PreviewThumbnails,
  PreviewWrapper,
  usePreviewMulti,
} from '@/components/Preview/shared';

const PreviewMultiDesktopViewer = dynamic(
  () => import('@/components/Preview/PreviewMulti/PreviewMultiDesktopViewer'),
  { ssr: false },
);

const PreviewMultiDesktop = ({
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

  const disabled = isLoading || !currentFile;

  const renderer = () => {
    if (!currentFile) return null;

    const { badge, ...file } = currentFile;

    return (
      <PreviewMultiDesktopViewer
        badge={badge}
        closeOption={{ onClose }}
        file={file}
        id={previewId}
        isLoading={isLoading}
      />
    );
  };

  return (
    <PreviewOverlayWrapper className={PREVIEW_RESPONSE_STYLES.DESKTOP.WRAPPER}>
      <PreviewWrapper
        className={clsx(
          className,
          PREVIEW_RESPONSE_STYLES.DESKTOP.CONTAINER,
          'in-flex-h-stack items-stretch',
        )}
      >
        <PreviewThumbnails
          className='in-flex-v-stack mx-[0.875rem] my-5 gap-y-2 overflow-y-auto'
          currentFile={currentFile}
          disabled={disabled}
          files={files}
          previewId={previewId}
          onChange={onChange}
        />
        <PreviewMultiController
          currentFile={currentFile}
          disabled={disabled}
          files={files}
          previewId={previewId}
          onChange={onChange}
        >
          {renderer()}
        </PreviewMultiController>
      </PreviewWrapper>
    </PreviewOverlayWrapper>
  );
};

export default PreviewMultiDesktop;
