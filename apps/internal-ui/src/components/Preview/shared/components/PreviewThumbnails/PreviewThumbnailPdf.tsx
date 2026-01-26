import dynamic from 'next/dynamic';

import usePreviewThumbnailPdf from '@/components/Preview/shared/components/PreviewThumbnails/hooks/usePreviewThumbnailPdf';
import { PreviewThumbnailPdfProps } from '@/components/Preview/shared/components/PreviewThumbnails/types';

const PreviewThumbnailImage = dynamic(() => import('./PreviewThumbnailImage'), {
  ssr: false,
});

const PreviewThumbnailPdf = ({
  file,
  setIsLoading,
}: PreviewThumbnailPdfProps) => {
  const { url } = usePreviewThumbnailPdf({ file, setIsLoading });

  if (!url) return null;

  return <PreviewThumbnailImage setIsLoading={setIsLoading} src={url} />;
};

export default PreviewThumbnailPdf;
