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
  SINGLE_FILE_ONLY: 'SINGLE_FILE_ONLY',
  TOO_MANY_FILES: 'TOO_MANY_FILES',
  NEED_ACTIVE_MULTIPLE_OPTION: 'NEED_ACTIVE_MULTIPLE_OPTION',
  INVALID_FILE_FORMAT: 'INVALID_FILE_FORMAT',
} as const;

export const DROPZONE_REJECT_MESSAGE: Record<DropzoneRejectionCodes, string> = {
  [DROPZONE_REJECT_CODE_MAPPER['SINGLE_FILE_ONLY']]:
    '한 개의 파일만 선택할 수 있어요',
  [DROPZONE_REJECT_CODE_MAPPER['TOO_MANY_FILES']]:
    '너무 많은 파일이 선택되었어요',
  [DROPZONE_REJECT_CODE_MAPPER['NEED_ACTIVE_MULTIPLE_OPTION']]:
    '다중 선택 옵션을 활성화 시켜주세요',
  [DROPZONE_REJECT_CODE_MAPPER['INVALID_FILE_FORMAT']]:
    '지원하지 않는 형식의 파일이 있어요',
};
