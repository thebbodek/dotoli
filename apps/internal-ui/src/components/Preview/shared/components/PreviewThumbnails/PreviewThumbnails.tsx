import clsx from 'clsx';

import PreviewThumbnail from '@/components/Preview/shared/components/PreviewThumbnails/PreviewThumbnail';
import { PreviewThumbnailsProps } from '@/components/Preview/shared/components/PreviewThumbnails/types';

const PreviewThumbnails = ({
  previewId,
  files,
  currentFile,
  isLoading,
  className,
  onChange,
  disabled,
}: PreviewThumbnailsProps) => {
  return (
    <ul className={clsx('shrink-0', className)}>
      {files.map((file) => (
        <PreviewThumbnail
          disabled={disabled || isLoading}
          file={file}
          isCurrent={!!currentFile && currentFile.id === file.id}
          isLoading={isLoading}
          key={file.id}
          previewId={previewId}
          onChange={onChange}
        />
      ))}
    </ul>
  );
};

export default PreviewThumbnails;
