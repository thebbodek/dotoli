import {
  PREVIEW_FIT_MODE,
  PREVIEW_TRANSFORM_VALUES,
} from '@/components/Preview/shared/components/Preview/constants';
import PreviewImage from '@/components/Preview/shared/components/Preview/PreviewImage';
import {
  PreviewImageSize,
  PreviewPdfViewerImageProps,
} from '@/components/Preview/shared/components/Preview/types';

const PreviewPdfViewerImage = ({
  src,
  imgSize,
  viewerSize,
  downloadOptions,
  previewOptions,
  isError,
  onLoadImage,
  onError,
}: PreviewPdfViewerImageProps) => {
  const { rotate, scale } = previewOptions;
  const { width: viewerWidth, height: viewerHeight } = viewerSize;
  const isRotated =
    Math.abs(rotate % PREVIEW_TRANSFORM_VALUES.ROTATE['-180']) !== 0;
  const fitMode = previewOptions.fitMode ?? PREVIEW_FIT_MODE.HEIGHT;

  const swap = ({ width, height }: PreviewImageSize) => ({
    height: width,
    width: height,
  });

  const calculateImageSize = () => {
    if (!imgSize) {
      return { width: viewerSize.width, height: viewerSize.height };
    }

    if (fitMode === PREVIEW_FIT_MODE.WIDTH) {
      const width = viewerWidth * scale;
      const ratioW = imgSize.width / imgSize.height;

      return { width, height: width / ratioW };
    } else {
      const height = viewerHeight * scale;
      const ratioH = imgSize.height / imgSize.width;

      return { height, width: height / ratioH };
    }
  };

  const size = calculateImageSize();

  return (
    <div
      className='relative mx-auto mt-2.5 w-fit first:mt-0'
      style={isRotated ? swap(size) : size}
    >
      <PreviewImage
        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
        downloadOptions={downloadOptions}
        isError={isError}
        previewOptions={previewOptions}
        size={viewerSize}
        src={src}
        viewerSize={viewerSize}
        onError={onError}
        onLoad={onLoadImage}
      />
    </div>
  );
};

export default PreviewPdfViewerImage;
