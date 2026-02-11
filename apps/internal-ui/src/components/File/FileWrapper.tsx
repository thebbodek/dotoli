import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { FILE_ELEMENTS, FILE_UPLOAD_STATES } from '@/components/File/constants';
import FileWrapperLayout from '@/components/File/FileWrapperLayout';
import { FileElements, FileWrapperProps } from '@/components/File/types';

const FileWrapper = <T extends FileElements = typeof FILE_ELEMENTS.LI>({
  state,
  as,
  children,
  className,
}: PropsWithChildren<FileWrapperProps<T>>) => {
  return (
    <FileWrapperLayout
      className={clsx(
        className,
        'in-tablet:p-2.5 in-tablet:pr-4 justify-between p-1 pr-2',
        state === FILE_UPLOAD_STATES.ERROR && 'bg-in-red-01 rounded-in-8',
      )}
      as={as}
    >
      {children}
    </FileWrapperLayout>
  );
};

export default FileWrapper;
