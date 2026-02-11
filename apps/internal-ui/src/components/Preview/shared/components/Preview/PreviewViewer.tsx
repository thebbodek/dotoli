import dynamic from 'next/dynamic';

import {
  isSupportImageFileType,
  isSupportPdfFileType,
} from '@/components/Preview/shared';
import PreviewLoading from '@/components/Preview/shared/components/Preview/PreviewLoading';
import PreviewNotSupport from '@/components/Preview/shared/components/Preview/PreviewNotSupport';
import { PreviewViewerProps } from '@/components/Preview/shared/components/Preview/types';
import { isFileData } from '@/components/Preview/utils';

const PreviewImageViewer = dynamic(
  () =>
    import('@/components/Preview/shared/components/Preview/PreviewImageViewer'),
  { ssr: false },
);

const PreviewPdfViewer = dynamic(
  () =>
    import('@/components/Preview/shared/components/Preview/PreviewPdfViewer'),
  { ssr: false },
);

const PreviewViewer = ({
  viewerSize,
  file,
  previewOptions,
  isLoading = false,
}: PreviewViewerProps) => {
  if (isLoading || !viewerSize || !file) {
    return <PreviewLoading />;
  }

  const { name } = file;

  if (!isFileData(file)) {
    return <PreviewNotSupport downloadOptions={{ url: file.url, name }} />;
  }

  const commonProps = { file, viewerSize, previewOptions };

  if (isSupportImageFileType({ type: file.type })) {
    return <PreviewImageViewer {...commonProps} />;
  }

  if (isSupportPdfFileType({ type: file.type })) {
    return <PreviewPdfViewer {...commonProps} />;
  }

  return <PreviewNotSupport downloadOptions={{ url: file.blob, name }} />;
};

export default PreviewViewer;
