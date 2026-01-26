import { fileDownload } from '@bbodek/utils';
import clsx from 'clsx';

import { IconButton } from '@/components/Button';
import {
  calculatePreviewTransformValue,
  PREVIEW_TRANSFORM_DIRECTION,
} from '@/components/Preview/shared';
import {
  PREVIEW_FIT_MODE,
  PREVIEW_TRANSFORM_TYPE,
  PREVIEW_TRANSFORM_VALUES,
} from '@/components/Preview/shared/components/Preview/constants';
import { PreviewToolbarProps } from '@/components/Preview/shared/components/Preview/types';
import { isFileData } from '@/components/Preview/utils';

const PreviewToolbar = ({
  file,
  previewOptions,
  setPreviewOptions,
  className,
}: PreviewToolbarProps) => {
  const isDisabled = !file || !isFileData(file);
  const { SCALE, ROTATE } = PREVIEW_TRANSFORM_VALUES;

  return (
    <footer
      className={clsx(className, 'in-flex-h-stack-center gap-x-2 pt-2 pb-3')}
    >
      <IconButton
        aria-label='회전'
        disabled={isDisabled}
        iconKey='arrow-counter-clockwise'
        theme='white'
        onClick={() =>
          setPreviewOptions(({ rotate, ...prev }) => ({
            ...prev,
            rotate:
              rotate === ROTATE.MAX
                ? ROTATE.MIN
                : calculatePreviewTransformValue({
                    type: PREVIEW_TRANSFORM_TYPE.ROTATE,
                    direction: PREVIEW_TRANSFORM_DIRECTION.DOWN,
                    value: rotate,
                  }),
          }))
        }
      />
      <IconButton
        aria-label='축소'
        disabled={isDisabled || previewOptions.scale === SCALE.MIN}
        iconKey='minus'
        theme='white'
        onClick={() =>
          setPreviewOptions(({ scale, ...prev }) => ({
            ...prev,
            scale:
              scale !== SCALE.MIN
                ? calculatePreviewTransformValue({
                    type: PREVIEW_TRANSFORM_TYPE.SCALE,
                    direction: PREVIEW_TRANSFORM_DIRECTION.DOWN,
                    value: scale,
                  })
                : scale,
          }))
        }
      />
      <IconButton
        aria-label='확대'
        disabled={isDisabled || previewOptions.scale === SCALE.MAX}
        iconKey='plus'
        theme='white'
        onClick={() =>
          setPreviewOptions(({ scale, ...prev }) => ({
            ...prev,
            scale:
              scale !== SCALE.MAX
                ? calculatePreviewTransformValue({
                    type: PREVIEW_TRANSFORM_TYPE.SCALE,
                    direction: PREVIEW_TRANSFORM_DIRECTION.UP,
                    value: scale,
                  })
                : scale,
          }))
        }
      />
      <IconButton
        aria-label='높이에 맞춤'
        disabled={isDisabled}
        iconKey='arrows-out-line-vertical'
        theme='white'
        onClick={() =>
          setPreviewOptions((prev) => ({
            ...prev,
            scale: SCALE.FIT,
            rotate: ROTATE.MIN,
            fitMode: PREVIEW_FIT_MODE.HEIGHT,
          }))
        }
      />
      <IconButton
        aria-label='너비에 맞춤'
        disabled={isDisabled}
        iconKey='arrows-out-line-horizontal'
        theme='white'
        onClick={() =>
          setPreviewOptions((prev) => ({
            ...prev,
            scale: SCALE.FIT,
            rotate: ROTATE.MIN,
            fitMode: PREVIEW_FIT_MODE.WIDTH,
          }))
        }
      />
      <div className='bg-in-gray-08 h-4 w-px' />
      <IconButton
        aria-label='다운로드'
        disabled={isDisabled}
        iconKey='download'
        theme='white'
        onClick={() => {
          if (isDisabled) return;

          fileDownload({ url: file.blob, name: file.name });
        }}
      />
    </footer>
  );
};

export default PreviewToolbar;
