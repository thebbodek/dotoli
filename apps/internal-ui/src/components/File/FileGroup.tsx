import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { FileGroupProps } from '@/components/File/types';
import { Typography } from '@/components/Typography';

const FileGroup = ({
  label,
  children,
  className,
}: PropsWithChildren<FileGroupProps>) => {
  return (
    <ul
      className={clsx(className, 'in-flex-v-stack gap-y-1', label && 'pb-1.5')}
    >
      {label && (
        <Typography as='strong' color='gray-05' variant='body-14-m'>
          {label}
        </Typography>
      )}
      {children}
    </ul>
  );
};

export default FileGroup;
