import clsx from 'clsx';
import Image from 'next/image';

import {
  PREVIEW_FIT_MODE,
  PREVIEW_VIEWER_STYLES,
} from '@/components/Preview/shared/components/Preview/constants';
import PreviewNotSupport from '@/components/Preview/shared/components/Preview/PreviewNotSupport';
import { PreviewImageProps } from '@/components/Preview/shared/components/Preview/types';
import { ImageErrorBoundary } from '@/components/shared';

const PreviewImage = ({
  src,
  size,
  viewerSize,
  downloadOptions,
  previewOptions,
  className,
  isError,
  onLoad,
  onError,
}: PreviewImageProps) => {
  const { rotate, fitMode, scale } = previewOptions;
  const { width, height } =
    fitMode === PREVIEW_FIT_MODE.WIDTH
      ? { width: size.width && size.width * scale }
      : { height: size.height && size.height * scale };

  return (
    <ImageErrorBoundary
      errorComponent={<PreviewNotSupport downloadOptions={downloadOptions} />}
      isError={isError}
    >
      <Image
        className={clsx(
          className,
          'fill-center max-h-none max-w-none shrink-0 will-change-[rotate] transform-fill',
          PREVIEW_VIEWER_STYLES.ROTATE[rotate],
        )}
        alt=''
        height={0}
        sizes={`${width ?? viewerSize.width}px`}
        src={src}
        style={{ width: width ?? 'auto', height: height ?? 'auto' }}
        width={0}
        onError={onError}
        onLoad={onLoad}
      />
    </ImageErrorBoundary>
  );
};

export default PreviewImage;
