export const ACCEPT_FILE_EXT = {
  PNG: 'png',
  JPEG: 'jpeg',
  HEIC: 'heic',
  WEBP: 'webp',
  PDF: 'pdf',
  XLSX: 'xlsx',
  DOCX: 'docx',
  JPG: 'jpg',
  PPT: 'ppt',
  PPTX: 'pptx',
  ODP: 'odp',
} as const;

export const ACCEPT_FILES = Object.values(ACCEPT_FILE_EXT);
