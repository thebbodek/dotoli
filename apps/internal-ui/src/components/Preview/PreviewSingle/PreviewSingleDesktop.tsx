import clsx from 'clsx';

import { PreviewSingleProps } from '@/components/Preview/PreviewSingle/types';
import {
  PREVIEW_FILE_NAME_FALLBACK,
  PREVIEW_RESPONSE_STYLES,
  PreviewHeader,
  PreviewOverlayWrapper,
  PreviewToolbar,
  PreviewViewer,
  PreviewViewerWrapper,
  PreviewWrapper,
  usePreview,
} from '@/components/Preview/shared';

const PreviewSingleDesktop = ({
  file,
  badge,
  isLoading,
  onClose,
  className,
}: Omit<PreviewSingleProps, 'isOpen'>) => {
  const {
    models: { viewerRef, viewerSize, titleId, previewOptions },
    operations: { setPreviewOptions },
  } = usePreview();

  return (
    <PreviewOverlayWrapper className={PREVIEW_RESPONSE_STYLES.DESKTOP.WRAPPER}>
      <PreviewWrapper
        className={clsx(
          className,
          PREVIEW_RESPONSE_STYLES.DESKTOP.CONTAINER,
          'in-flex-v-stack',
        )}
      >
        <PreviewHeader
          badge={badge}
          className={PREVIEW_RESPONSE_STYLES.DESKTOP.HEADER}
          closeOption={{ onClose }}
          fileName={file?.name ?? PREVIEW_FILE_NAME_FALLBACK}
          titleId={titleId}
        />
        <PreviewViewerWrapper
          aria-labelledby={titleId}
          className={PREVIEW_RESPONSE_STYLES.DESKTOP.VIEWER_WRAPPER}
          ref={viewerRef}
        >
          <PreviewViewer
            file={file}
            isLoading={isLoading}
            previewOptions={previewOptions}
            viewerSize={viewerSize}
          />
        </PreviewViewerWrapper>
        <PreviewToolbar
          file={file}
          previewOptions={previewOptions}
          setPreviewOptions={setPreviewOptions}
        />
      </PreviewWrapper>
    </PreviewOverlayWrapper>
  );
};

export default PreviewSingleDesktop;
