import { FileState, FileUploadState } from '@/components/File/types';
import { ColorVariants } from '@/variants';

export const FILE_THUMBNAIL_SIZE = 52;

export const FILE_ELEMENTS = {
  DIV: 'div',
  LI: 'li',
} as const;

export const FILE_UPLOAD_STATES = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  DEFAULT: 'DEFAULT',
  ERROR: 'ERROR',
} as const;

export const FILE_STATES = {
  ...FILE_UPLOAD_STATES,
  DISABLED: 'DISABLED',
} as const;

export const FILE_STATE_DESCRIPTION_COLORS: Record<
  FileUploadState,
  ColorVariants
> = {
  [FILE_UPLOAD_STATES.LOADING]: 'primary-05',
  [FILE_UPLOAD_STATES.SUCCESS]: 'gray-05',
  [FILE_UPLOAD_STATES.DEFAULT]: 'gray-05',
  [FILE_UPLOAD_STATES.ERROR]: 'red-04',
};

export const FILE_STATE_THUMBNAIL_STYLES: Record<FileState, string> = {
  [FILE_STATES.DEFAULT]:
    'border-in-gray-02 hover:border-in-primary-04 bg-in-gray-01',
  [FILE_STATES.SUCCESS]:
    'border-in-gray-02 hover:border-in-primary-04 bg-in-gray-01',
  [FILE_STATES.LOADING]: 'border-in-gray-02 bg-in-gray-01',
  [FILE_STATES.ERROR]: 'border-in-red-03 bg-in-red-01 cursor-not-allowed',
  [FILE_STATES.DISABLED]: 'border-in-gray-02 bg-in-gray-01 cursor-not-allowed',
};
