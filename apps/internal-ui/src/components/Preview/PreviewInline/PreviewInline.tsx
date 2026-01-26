import clsx from 'clsx';
import dynamic from 'next/dynamic';

import { PreviewInlineProps } from '@/components/Preview/PreviewInline/types';
import {
  PREVIEW_RESPONSE_STYLES,
  PreviewThumbnails,
  PreviewWrapper,
  useFileDataCleanUpEffect,
  usePreviewMulti,
} from '@/components/Preview/shared';

const PreviewInlineViewer = dynamic(
  () => import('@/components/Preview/PreviewInline/PreviewInlineViewer'),
  { ssr: false },
);

const PreviewMultiController = dynamic(
  () =>
    import(
      '@/components/Preview/shared/components/PreviewMultiController/PreviewMultiController'
    ),
  { ssr: false },
);

const PreviewInline = ({
  isExpanded,
  files,
  initialFile,
  isLoading,
  className,
  onClose,
  onExpand,
}: PreviewInlineProps) => {
  const {
    models: { previewId, currentFile },
    operations: { onChange },
  } = usePreviewMulti({ files, initialFile });

  const disabled = isLoading || !currentFile;

  const renderer = () => {
    if (!currentFile) return null;

    const { badge, ...file } = currentFile;

    return (
      <PreviewInlineViewer
        closeOption={{
          iconKey: 'caret-line-left',
          'aria-label': '접기',
          onClose,
        }}
        badge={badge}
        file={file}
        id={previewId}
        isLoading={isLoading}
      />
    );
  };

  useFileDataCleanUpEffect({ files });

  return (
    <PreviewWrapper
      className={clsx(
        className,
        PREVIEW_RESPONSE_STYLES.DESKTOP.CONTAINER,
        isExpanded ? 'max-w-[56.25rem] min-w-[35rem]' : 'max-w-[5.5rem]',
        'in-flex-h-stack items-stretch transition-[max-width] ease-out',
      )}
    >
      <PreviewThumbnails
        className='in-flex-v-stack mx-[0.875rem] my-5 gap-y-2 overflow-y-auto'
        currentFile={currentFile}
        disabled={disabled}
        files={files}
        previewId={previewId}
        onChange={({ file }) => {
          onExpand();
          onChange({ file });
        }}
      />
      {isExpanded && (
        <PreviewMultiController
          className='animate-in-fade-in'
          currentFile={currentFile}
          disabled={disabled}
          files={files}
          previewId={previewId}
          onChange={onChange}
        >
          {renderer()}
        </PreviewMultiController>
      )}
    </PreviewWrapper>
  );
};

export default PreviewInline;
