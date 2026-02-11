import dynamic from 'next/dynamic';

import { useThumbnailPdf } from '@/components/shared/components/Thumbnail/hooks';
import { ThumbnailPdfProps } from '@/components/shared/components/Thumbnail/types';

const ThumbnailImage = dynamic(
  () => import('@/components/shared/components/Thumbnail/ThumbnailImage'),
  { ssr: false },
);

const ThumbnailPdfImage = ({
  file,
  size,
  setIsLoading,
  ...props
}: ThumbnailPdfProps) => {
  const { url } = useThumbnailPdf({ file, size, setIsLoading });

  if (!url) return null;

  return (
    <ThumbnailImage
      setIsLoading={setIsLoading}
      size={size}
      src={url}
      {...props}
    />
  );
};

export default ThumbnailPdfImage;
