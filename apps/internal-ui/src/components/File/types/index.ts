import { HTMLAttributes } from 'react';

import {
  FILE_ELEMENTS,
  FILE_STATES,
  FILE_UPLOAD_STATES,
} from '@/components/File/constants';
import { PreviewFileData, PreviewProps } from '@/components/Preview';
import { NonNullableType } from '@/components/shared';

export type FileElements = (typeof FILE_ELEMENTS)[keyof typeof FILE_ELEMENTS];

export type FileUploadState =
  (typeof FILE_UPLOAD_STATES)[keyof typeof FILE_UPLOAD_STATES];

export type FileState = (typeof FILE_STATES)[keyof typeof FILE_STATES];

export interface FileProps<T extends FileElements = typeof FILE_ELEMENTS.LI> {
  as?: T;
  file: PreviewFileData;
  url?: string;
  createdAt?: string;
  state?: FileUploadState;
  onDelete?: ({ id }: Pick<PreviewFileData, 'id'>) => void;
  onPreview: ({ file }: NonNullableType<Pick<PreviewProps, 'file'>>) => void;
  onEdit?: ({ id, value }: FileOnEditParams) => void;
  onDownload?: ({ id }: Pick<PreviewFileData, 'id'>) => void;
  errorFeedback?: string;
  disabled?: boolean;
}

export interface FileWrapperLayoutProps<
  T extends FileElements = typeof FILE_ELEMENTS.LI,
> extends Pick<HTMLAttributes<T>, 'className'>,
    Required<Pick<FileProps<T>, 'as'>> {}

export interface FileWrapperProps<
  T extends FileElements = typeof FILE_ELEMENTS.LI,
> extends Required<Pick<FileProps<T>, 'state' | 'as'>>,
    Pick<HTMLAttributes<HTMLDivElement>, 'className'> {}

export interface FileOnEditParams extends Pick<PreviewFileData, 'id'> {
  value: string;
}

export interface FileGroupProps
  extends Pick<HTMLAttributes<HTMLUListElement>, 'className'> {
  label?: string;
}
