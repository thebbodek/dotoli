import clsx from 'clsx';
import { HTMLAttributes, PropsWithChildren } from 'react';

import { IconButton } from '@/components/Button';
import { PreviewMultiControlsPrimitiveProps } from '@/components/Preview/shared/types';

const PreviewMultiController = ({
  files,
  currentFile,
  previewId,
  className,
  children,
  disabled,
  onChange,
}: PropsWithChildren<
  PreviewMultiControlsPrimitiveProps &
    Pick<HTMLAttributes<HTMLDivElement>, 'className'>
>) => {
  const currentFileIndex = currentFile
    ? files.findIndex((file) => file.id === currentFile.id)
    : null;
  const isDisabled = disabled || currentFileIndex === null;

  return (
    <div
      className={clsx(
        className,
        'in-flex-v-stack group relative w-[calc(100%-3.75rem)] overflow-hidden',
      )}
    >
      {children}
      {currentFileIndex !== 0 && (
        <IconButton
          aria-controls={previewId}
          aria-label='이전'
          className='absolute top-1/2 left-[1.625rem] z-10 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100'
          disabled={isDisabled}
          iconKey='caret-line-left'
          theme='dark'
          onClick={() => onChange({ file: files[currentFileIndex! - 1] })}
        />
      )}
      {currentFileIndex !== files.length - 1 && (
        <IconButton
          aria-controls={previewId}
          aria-label='다음'
          className='absolute top-1/2 right-[1.625rem] z-10 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100'
          disabled={isDisabled}
          iconKey='caret-line-right'
          theme='dark'
          onClick={() => onChange({ file: files[currentFileIndex! + 1] })}
        />
      )}
    </div>
  );
};

export default PreviewMultiController;
