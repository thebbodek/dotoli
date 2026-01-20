import { DropzoneState, UseDropzone, UseDropzoneReturn } from '@bbodek/hooks';
import { HTMLAttributes } from 'react';

export interface FileUploaderProps
  extends Pick<UseDropzone, 'accept' | 'disabled' | 'max'>,
    Pick<UseDropzoneReturn, 'rootProps' | 'inputProps'>,
    Pick<DropzoneState, 'rejectedFiles'>,
    Pick<HTMLAttributes<HTMLDivElement>, 'className'> {}
