import { FILE_UPLOAD_STATES } from '@/components/File/constants';
import FileDeleteButton from '@/components/File/FileActions/FileDeleteButton';
import FileDownloadButton from '@/components/File/FileActions/FileDownloadButton';
import { FileActionsProps } from '@/components/File/FileActions/types';

const FileActions = ({
  file,
  state,
  disabled,
  onDelete,
  onDownload,
}: FileActionsProps) => {
  return (
    <>
      {state !== FILE_UPLOAD_STATES.ERROR && (
        <FileDownloadButton
          disabled={disabled}
          file={file}
          onDownload={onDownload}
        />
      )}
      {onDelete && (
        <FileDeleteButton
          disabled={disabled}
          onClick={() => onDelete({ id: file.id })}
        />
      )}
    </>
  );
};

export default FileActions;
