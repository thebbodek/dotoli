import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { KeyboardEvent } from 'react';

import {
  FILE_STATE_THUMBNAIL_STYLES,
  FILE_STATES,
  FILE_UPLOAD_STATES,
} from '@/components/File/constants';
import FileThumbnailHoverOverlay from '@/components/File/FileThumbnail/FileThumbnailHoverOverlay';
import FileThumbnailNotSupport from '@/components/File/FileThumbnail/FileThumbnailNotSupport';
import { FileThumbnailProps } from '@/components/File/FileThumbnail/types';
import { Icon } from '@/components/Icon';
import { isFileData } from '@/components/Preview';
import { isSupportFileType } from '@/components/Preview/shared';

const FileThumbnailImage = dynamic(
  () => import('@/components/File/FileThumbnail/FileThumbnailImage'),
  { ssr: false },
);

const FileThumbnail = ({
  file,
  state,
  onPreview,
  disabled,
}: FileThumbnailProps) => {
  const _state = disabled ? FILE_STATES.DISABLED : state;
  const isError = state === FILE_UPLOAD_STATES.ERROR;
  const isDisabled = disabled || isError;

  const renderer = () => {
    if (isError || !isFileData(file)) {
      return (
        <Icon className='text-in-red-03 text-[1.5rem]' iconKey='image-broken' />
      );
    }

    if (isSupportFileType({ type: file.type })) {
      return <FileThumbnailImage file={file} />;
    }

    return <FileThumbnailNotSupport />;
  };

  const onClick = () => {
    if (isDisabled) return;

    onPreview({ file });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();

      onClick();
    }
  };

  return (
    <div
      className={clsx(
        'group in-flex-h-stack-center rounded-in-8 in-tablet:h-[3.25rem] in-tablet:w-[3.25rem] relative h-[2.25rem] w-[2.25rem] shrink-0 overflow-hidden border',
        FILE_STATE_THUMBNAIL_STYLES[_state],
      )}
      aria-disabled={isDisabled}
      role='button'
      tabIndex={isDisabled ? -1 : 0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      {renderer()}
      {!isDisabled && <FileThumbnailHoverOverlay />}
    </div>
  );
};

export default FileThumbnail;
