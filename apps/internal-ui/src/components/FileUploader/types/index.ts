import { DropzoneState, UseDropzone, UseDropzoneReturn } from '@bbodek/hooks';
import { HTMLAttributes, ReactNode } from 'react';

export interface FileUploaderProps
  extends Pick<UseDropzone, 'accept' | 'disabled' | 'max'>,
    Pick<UseDropzoneReturn, 'rootProps' | 'inputProps'>,
    Pick<DropzoneState, 'rejectedFiles'>,
    Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  description?: ReactNode;
  isPending?: boolean;
}

export interface FileUploaderTitleProps
  extends Pick<FileUploaderProps, 'disabled' | 'isPending'> {}

export interface FileUploaderDescriptionProps
  extends Required<Pick<FileUploaderProps, 'accept' | 'max'>>,
    Pick<FileUploaderProps, 'description' | 'disabled' | 'isPending'> {}
