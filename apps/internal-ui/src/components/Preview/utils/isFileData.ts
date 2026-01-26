import { FileData } from '@bbodek/hooks';

import { PreviewFileData } from '@/components/Preview/shared/components';

export const isFileData = (file: PreviewFileData): file is FileData => {
  return (
    'original' in file &&
    'blob' in file &&
    'size' in file &&
    'lastModified' in file &&
    'webkitRelativePath' in file
  );
};
