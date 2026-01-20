import { DropzoneRejectionCodes } from '@/hooks/useDropzone/types';

export const DROPZONE_ACTION_MAPPER = {
  DRAG: 'drag',
  HOVER: 'hover',
  SET_FILES: 'setFiles',
  SET_REJECT: 'setReject',
  DELETE_FILE: 'deleteFile',
  RESET_FILES: 'resetFiles',
} as const;

export const DROPZONE_REJECT_CODE_MAPPER = {
  INVALID_FILE_FORMAT: 'INVALID_FILE_FORMAT',
  TOO_LARGE_FILE: 'TOO_LARGE_FILE',
  TOO_MANY_FILES: 'TOO_MANY_FILES',
} as const;

export const DROPZONE_REJECT_MESSAGE: Record<DropzoneRejectionCodes, string> = {
  [DROPZONE_REJECT_CODE_MAPPER.INVALID_FILE_FORMAT]:
    '지원되지 않는 확장자입니다',
  [DROPZONE_REJECT_CODE_MAPPER.TOO_LARGE_FILE]:
    '업로드 가능한 용량을 초과하였습니다',
  [DROPZONE_REJECT_CODE_MAPPER.TOO_MANY_FILES]:
    '업로드 가능한 개수를 초과하였습니다',
};

export const FILE_DEFAULT_MAX_SIZE = 50;
