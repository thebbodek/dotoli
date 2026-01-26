import { Dispatch, HTMLAttributes, RefObject } from 'react';

import {
  DROPZONE_ACTION_MAPPER,
  DROPZONE_REJECT_CODE_MAPPER,
} from '@/hooks/useDropzone/constants';

export interface UseDropzoneReducerReturnType {
  state: DropzoneState;
  dispatch: Dispatch<DropzoneAction>;
}

export interface UseDropzoneUpload
  extends Omit<UseDropzone, 'disabled'>,
    UseDropzoneReducerReturnType {
  uploadedFiles: DropzoneState['acceptedFiles'];
}

export interface UseDropzoneUploadReturnType {
  handleUpload: ({ files }: HandleUpload) => void;
  deleteFile: ({ id }: Pick<FileData, 'id'>) => void;
  resetFiles: () => void;
}

export interface HandleUpload {
  files: FileList;
}

export interface RejectUpload extends Pick<DropzoneState, 'acceptedFiles'> {
  rejectCode: DropzoneRejectionCodes;
}

export interface OnDrop
  extends Pick<DropzoneState, 'acceptedFiles' | 'rejectedFiles'>,
    Partial<UseDropzoneReducerReturnType> {}

export interface OnDropAccepted
  extends Pick<DropzoneState, 'acceptedFiles'>,
    Partial<UseDropzoneReducerReturnType> {}

export interface OnDropRejected
  extends Required<Pick<DropzoneState, 'rejectedFiles'>>,
    Partial<UseDropzoneReducerReturnType> {}

export interface UseDropzone {
  multiple?: boolean;
  onDrop?: ({ acceptedFiles, rejectedFiles, state, dispatch }: OnDrop) => void;
  onDropAccepted?: ({ acceptedFiles, state, dispatch }: OnDropAccepted) => void;
  onDropRejected?: ({ rejectedFiles, state, dispatch }: OnDropRejected) => void;
  limit?: number;
  disabled?: boolean;
  accept?: string[];
  max?: number;
}

export interface UseDropzoneReturn
  extends UseDropzoneReducerReturnType,
    Omit<UseDropzoneUploadReturnType, 'handleUpload'> {
  rootProps: (
    params?: HTMLAttributes<HTMLDivElement>,
  ) => Omit<HTMLAttributes<HTMLDivElement>, 'color'>;
  inputProps: (
    params?: HTMLAttributes<HTMLInputElement>,
  ) => HTMLAttributes<HTMLInputElement>;
}

export interface UseDropzoneRoot
  extends Pick<UseDropzone, 'disabled'>,
    Pick<UseDropzoneReducerReturnType, 'dispatch'>,
    Pick<UseDropzoneUploadReturnType, 'handleUpload'> {
  inputRef: RefObject<HTMLInputElement | null>;
}

export interface UseDropzoneInput
  extends Pick<UseDropzone, 'disabled' | 'multiple' | 'accept'>,
    Pick<UseDropzoneUploadReturnType, 'handleUpload'> {}

export interface FileData
  extends Pick<
    File,
    'name' | 'size' | 'type' | 'lastModified' | 'webkitRelativePath'
  > {
  id: string;
  blob: string;
  original: File;
}

export interface DropzoneState {
  isDragActive: boolean;
  isHover: boolean;
  isActive: boolean;
  acceptedFiles: FileData[];
  rejectedFiles?: {
    files: FileData[];
    code: DropzoneRejectionCodes;
  };
}

type DropzoneActions =
  (typeof DROPZONE_ACTION_MAPPER)[keyof typeof DROPZONE_ACTION_MAPPER];

export type DropzoneRejectionCodes =
  (typeof DROPZONE_REJECT_CODE_MAPPER)[keyof typeof DROPZONE_REJECT_CODE_MAPPER];

export interface DropzoneAction
  extends Partial<DropzoneState>,
    Partial<Pick<FileData, 'id'>> {
  type: DropzoneActions;
}
