import { extractExt } from '@/extractExt';
import { ACCEPT_FILE_EXT } from '@/shared/constants/ext';
import { AcceptFileExt, ExtFnParams } from '@/shared/types/Ext';

export const ACCEPT_FILE_MIME_TYPE: Record<AcceptFileExt, string> = {
  [ACCEPT_FILE_EXT.PNG]: 'image/png',
  [ACCEPT_FILE_EXT.JPEG]: 'image/jpeg',
  [ACCEPT_FILE_EXT.JPG]: 'image/jpeg',
  [ACCEPT_FILE_EXT.HEIC]: 'image/heic',
  [ACCEPT_FILE_EXT.WEBP]: 'image/webp',
  [ACCEPT_FILE_EXT.PDF]: 'application/pdf',
  [ACCEPT_FILE_EXT.XLSX]:
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  [ACCEPT_FILE_EXT.DOCX]:
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  [ACCEPT_FILE_EXT.PPT]: 'application/vnd.ms-powerpoint',
  [ACCEPT_FILE_EXT.PPTX]:
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  [ACCEPT_FILE_EXT.ODP]: 'application/vnd.oasis.opendocument.presentation',
};

export const MIME_TYPE_FALLBACK = 'application/octet-stream';

export const extractMimeType = ({ accept, str }: ExtFnParams) => {
  const ext = extractExt({ accept, str });

  return ACCEPT_FILE_MIME_TYPE[ext as AcceptFileExt] ?? MIME_TYPE_FALLBACK;
};
