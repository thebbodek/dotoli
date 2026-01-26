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

const PreviewSingleMobile = ({
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
    <PreviewOverlayWrapper>
      <PreviewWrapper
        className={clsx(className, PREVIEW_RESPONSE_STYLES.MOBILE.CONTAINER)}
      >
        <PreviewHeader
          badge={badge}
          className={PREVIEW_RESPONSE_STYLES.MOBILE.HEADER}
          closeOption={{ onClose }}
          fileName={file?.name ?? PREVIEW_FILE_NAME_FALLBACK}
          titleId={titleId}
        />
        <PreviewViewerWrapper
          aria-labelledby={titleId}
          className={PREVIEW_RESPONSE_STYLES.MOBILE.VIEWER_WRAPPER}
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

export default PreviewSingleMobile;
