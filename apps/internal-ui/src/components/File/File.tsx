import dynamic from 'next/dynamic';

import { FILE_ELEMENTS, FILE_UPLOAD_STATES } from '@/components/File/constants';
import { FileActionsWrapper } from '@/components/File/FileActions';
import FileInfoSection from '@/components/File/FileInfo/FileInfoSection';
import { FileThumbnail } from '@/components/File/FileThumbnail';
import FileUploadStateIcon from '@/components/File/FileUploadStateIcon';
import FileWrapper from '@/components/File/FileWrapper';
import FileWrapperLayout from '@/components/File/FileWrapperLayout';
import { FileElements, FileProps } from '@/components/File/types';
import { isFileData } from '@/components/Preview';

const FileActions = dynamic(
  () => import('@/components/File/FileActions/FileActions'),
  { ssr: false },
);

const File = <T extends FileElements = typeof FILE_ELEMENTS.LI>({
  as,
  file,
  url,
  createdAt,
  state: externalState = FILE_UPLOAD_STATES.DEFAULT,
  onEdit,
  onDelete,
  onPreview,
  onDownload,
  disabled = false,
  errorFeedback,
}: FileProps<T>) => {
  const isError =
    (externalState === FILE_UPLOAD_STATES.ERROR || !isFileData(file)) &&
    !!errorFeedback;
  const state = isError ? FILE_UPLOAD_STATES.ERROR : externalState;
  const isDisabled = disabled || state === FILE_UPLOAD_STATES.LOADING;

  return (
    <FileWrapper as={as || FILE_ELEMENTS.LI} state={state}>
      <FileWrapperLayout as='div'>
        <FileThumbnail
          disabled={isDisabled}
          file={file}
          state={state}
          onPreview={onPreview}
        />
        <FileInfoSection
          createdAt={createdAt}
          disabled={isDisabled}
          errorFeedback={errorFeedback}
          id={file.id}
          name={file.name}
          state={state}
          url={url}
          onEdit={onEdit}
        />
      </FileWrapperLayout>
      <FileActionsWrapper>
        {state !== FILE_UPLOAD_STATES.LOADING && (
          <FileActions
            disabled={isDisabled}
            file={file}
            state={state}
            onDelete={onDelete}
            onDownload={onDownload}
          />
        )}
        <FileUploadStateIcon state={state} />
      </FileActionsWrapper>
    </FileWrapper>
  );
};

export default File;
