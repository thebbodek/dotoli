import { FileData } from '@bbodek/hooks';

import { FileProps } from '@/components/File/types';

export interface FileThumbnailProps
  extends Pick<FileProps, 'file' | 'onPreview'>,
    Required<Pick<FileProps, 'state' | 'disabled'>> {}

export interface FileThumbnailImageProps {
  file: FileData;
}
