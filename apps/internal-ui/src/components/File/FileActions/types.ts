import { FileProps } from '@/components/File/types';

export interface FileActionsProps
  extends Pick<FileProps, 'onDelete' | 'file' | 'onDownload'>,
    Required<Pick<FileProps, 'state' | 'disabled'>> {}
