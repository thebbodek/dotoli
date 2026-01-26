import {
  PREVIEW_RESPONSE_STYLES,
  PreviewHeader,
  PreviewProps,
  PreviewToolbar,
  PreviewViewer,
  PreviewViewerWrapper,
  usePreview,
} from '@/components/Preview/shared';
import { NonNullableType } from '@/components/shared';

const PreviewMultiMobileViewer = ({
  file,
  badge,
  closeOption,
  isLoading = false,
}: Omit<PreviewProps, 'file'> &
  NonNullableType<Pick<PreviewProps, 'file'>>) => {
  const {
    models: { viewerRef, viewerSize, titleId, previewOptions },
    operations: { setPreviewOptions },
  } = usePreview();

  return (
    <>
      <PreviewHeader
        badge={badge}
        className={PREVIEW_RESPONSE_STYLES.MOBILE.HEADER}
        closeOption={closeOption}
        fileName={file.name}
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
    </>
  );
};

export default PreviewMultiMobileViewer;
