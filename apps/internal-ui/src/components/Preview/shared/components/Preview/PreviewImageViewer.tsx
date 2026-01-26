import dynamic from 'next/dynamic';

import PreviewImageRenderer from '@/components/Preview/shared/components/Preview/PreviewLoadingRenderer';
import { PreviewImageViewerProps } from '@/components/Preview/shared/components/Preview/types';
import { usePreviewImage } from '@/components/Preview/shared/hooks/usePreviewImage';

const PreviewImage = dynamic(
  () => import('@/components/Preview/shared/components/Preview/PreviewImage'),
  { ssr: false },
);

const PreviewImageViewer = ({
  file,
  viewerSize,
  previewOptions,
}: PreviewImageViewerProps) => {
  const {
    status: { isLoading, isError },
    models: { imgSize },
    operations: { onLoadImage, onError },
  } = usePreviewImage();

  const { width: viewerWidth, height: viewerHeight } = viewerSize;
  const { width, height } = imgSize ?? {};
  const useOriginalImageSize =
    !!height && height < viewerHeight && previewOptions.fitMode === null;

  return (
    <PreviewImageRenderer isLoading={isLoading}>
      <PreviewImage
        size={{
          width: useOriginalImageSize ? width : viewerWidth,
          height: useOriginalImageSize ? height : viewerHeight,
        }}
        downloadOptions={{ url: file.blob, name: file.name }}
        isError={isError}
        previewOptions={previewOptions}
        src={file.blob}
        viewerSize={viewerSize}
        onError={onError}
        onLoad={onLoadImage}
      />
    </PreviewImageRenderer>
  );
};

export default PreviewImageViewer;
