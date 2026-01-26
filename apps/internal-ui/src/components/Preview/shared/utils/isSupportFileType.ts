import {
  PREVIEW_ACCEPT_FILE_EXT,
  PREVIEW_ACCEPT_IMAGE_FILE_EXT,
} from '@/components/Preview/shared/components';

export const isSupportFileType = ({ type }: Pick<File, 'type'>) => {
  return Object.values(PREVIEW_ACCEPT_FILE_EXT).some((previewFileType) =>
    type.includes(previewFileType),
  );
};

export const isSupportImageFileType = ({ type }: Pick<File, 'type'>) => {
  return Object.values(PREVIEW_ACCEPT_IMAGE_FILE_EXT).some((previewFileType) =>
    type.includes(previewFileType),
  );
};

export const isSupportPdfFileType = ({ type }: Pick<File, 'type'>) => {
  return type.includes(PREVIEW_ACCEPT_FILE_EXT.PDF);
};
