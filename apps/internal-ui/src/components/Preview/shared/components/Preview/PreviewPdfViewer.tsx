import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';

import { PreviewPdfImageUrl } from '@/components/Preview/shared/components/Preview/hooks/effects/usePreviewPdfImageUrlsEffect/types';
import usePreviewPdfImageUrlsEffect from '@/components/Preview/shared/components/Preview/hooks/effects/usePreviewPdfImageUrlsEffect/usePreviewPdfImageUrlsEffect';
import PreviewImageRenderer from '@/components/Preview/shared/components/Preview/PreviewLoadingRenderer';
import PreviewNotSupport from '@/components/Preview/shared/components/Preview/PreviewNotSupport';
import {
  PreviewFileData,
  PreviewPdfViewerProps,
} from '@/components/Preview/shared/components/Preview/types';
import { usePreviewImage } from '@/components/Preview/shared/hooks/usePreviewImage';

const PreviewPdfViewerImage = dynamic(
  () =>
    import(
      '@/components/Preview/shared/components/Preview/PreviewPdfViewerImage'
    ),
  { ssr: false },
);

const PreviewPdfViewer = ({
  file,
  viewerSize,
  previewOptions,
}: PreviewPdfViewerProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [urls, setUrls] = useState<PreviewPdfImageUrl[] | null>(null);

  const {
    models: { imgSize },
    status: { isLoading: isLoadingUrls, isError },
    operations: { setIsLoading, onLoadImage, setIsError },
  } = usePreviewImage();

  const onLoadImages = ({ id }: Pick<PreviewFileData, 'id'>) => {
    if (!urls) return;

    setUrls((prev) =>
      prev!.map((url) => (url.id === id ? { ...url, isLoaded: true } : url)),
    );
  };

  const onError = () => {
    if (!urls) return;

    setUrls((prev) => prev!.map((url) => ({ ...url, isLoaded: true })));
    setIsError(true);
  };

  usePreviewPdfImageUrlsEffect({
    file,
    width: viewerSize.width,
    listRef,
    setUrls,
    setIsLoading,
  });

  const isLoading = isLoadingUrls || (urls ?? []).some((url) => !url.isLoaded);
  const downloadOptions = { url: file.blob, name: file.name };

  if ((!isLoadingUrls && !urls) || isError) {
    return <PreviewNotSupport downloadOptions={downloadOptions} />;
  }

  return (
    <div
      className='h-full max-h-full w-full max-w-full overflow-auto'
      ref={listRef}
    >
      <PreviewImageRenderer isLoading={isLoading}>
        {urls &&
          urls.map(({ id, url }) => (
            <PreviewPdfViewerImage
              downloadOptions={downloadOptions}
              imgSize={imgSize}
              isError={isError}
              key={id}
              previewOptions={previewOptions}
              src={url}
              viewerSize={viewerSize}
              onLoadImage={(e) => {
                onLoadImage(e);
                onLoadImages({ id });
              }}
              onError={onError}
            />
          ))}
      </PreviewImageRenderer>
    </div>
  );
};

export default PreviewPdfViewer;
