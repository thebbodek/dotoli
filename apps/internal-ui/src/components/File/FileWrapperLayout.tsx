import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { FILE_ELEMENTS } from '@/components/File/constants';
import { FileElements, FileWrapperLayoutProps } from '@/components/File/types';

const FileWrapperLayout = <T extends FileElements = typeof FILE_ELEMENTS.LI>({
  as: Element,
  children,
  className,
}: PropsWithChildren<FileWrapperLayoutProps<T>>) => {
  const Component: FileElements = Element;

  return (
    <Component
      className={clsx(
        'in-tablet:gap-x-3 flex min-w-0 shrink grow items-center gap-x-2',
        className,
      )}
    >
      {children}
    </Component>
  );
};

export default FileWrapperLayout;
