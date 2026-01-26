import { isMobile } from '@bbodek/utils';
import clsx from 'clsx';
import dynamic from 'next/dynamic';

import {
  isSupportFileType,
  PreviewThumbnailProps,
} from '@/components/Preview/shared';
import PreviewThumbnailOverlay from '@/components/Preview/shared/components/PreviewThumbnails/PreviewThumbnailOverlay';
import { isFileData } from '@/components/Preview/utils';
import { Tooltip } from '@/components/Tooltip';

const PreviewThumbnailLoading = dynamic(
  () => import('./PreviewThumbnailLoading'),
  { ssr: false },
);

const PreviewThumbnailNotSupport = dynamic(
  () => import('./PreviewThumbnailNotSupport'),
  { ssr: false },
);

const PreviewThumbnailViewer = dynamic(
  () => import('./PreviewThumbnailViewer'),
  { ssr: false },
);

const PreviewThumbnail = ({
  file,
  previewId,
  isLoading,
  isCurrent,
  onChange,
  disabled = false,
}: PreviewThumbnailProps) => {
  const renderer = () => {
    if (isLoading) {
      return <PreviewThumbnailLoading />;
    }

    if (!isFileData(file) || !isSupportFileType({ type: file.type })) {
      return <PreviewThumbnailNotSupport />;
    }

    return <PreviewThumbnailViewer file={file} />;
  };

  return (
    <li
      className={clsx(
        'h-[3.75rem] w-[3.75rem] shrink-0',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
      )}
      aria-controls={previewId}
      aria-disabled={disabled}
      aria-selected={isCurrent}
      role='option'
      onClick={() => {
        if (disabled) return;

        onChange({ file });
      }}
    >
      <Tooltip
        rootClassName={clsx(
          'in-flex-h-stack-center bg-in-gray-01 rounded-in-6 relative h-full w-full overflow-hidden border transition-colors',
          isCurrent
            ? 'border-in-primary-05'
            : 'border-in-gray-02 in-mobile:hover:border-in-primary-05',
        )}
        content={file.name}
        hidden={disabled || isMobile()}
        placement='right'
      >
        {renderer()}
        <PreviewThumbnailOverlay isCurrent={isCurrent} />
      </Tooltip>
    </li>
  );
};

export default PreviewThumbnail;
