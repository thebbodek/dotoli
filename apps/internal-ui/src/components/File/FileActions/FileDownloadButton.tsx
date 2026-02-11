import { fileDownload } from '@bbodek/utils';

import { IconButton, IconButtonProps } from '@/components/Button';
import { FileProps } from '@/components/File/types';
import { isFileData } from '@/components/Preview';

const FileDownloadButton = ({
  file,
  disabled,
  onDownload,
}: Pick<FileProps, 'file' | 'onDownload'> &
  Pick<IconButtonProps, 'disabled'>) => {
  const isDisabled = disabled || !isFileData(file);

  return (
    <IconButton
      aria-label='다운로드'
      disabled={isDisabled}
      iconKey='download'
      onClick={() => {
        if (isDisabled) return;

        fileDownload({ url: file.blob, name: file.name });
        onDownload?.({ id: file.id });
      }}
    />
  );
};

export default FileDownloadButton;
