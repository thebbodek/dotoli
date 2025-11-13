import { ACCEPT_FILES, getUUID } from '@bbodek/utils';

import {
  DROPZONE_ACTION_MAPPER,
  DROPZONE_REJECT_CODE_MAPPER,
} from '@/hooks/useDropzone/constants';
import {
  FileData,
  HandleUpload,
  RejectUpload,
  UseDropzoneUpload,
  UseDropzoneUploadReturnType,
} from '@/hooks/useDropzone/types';
import { revokeFile } from '@/hooks/useDropzone/utils';

const useDropzoneUpload = ({
  uploadedFiles,
  state,
  dispatch,
  isMultiple = true,
  limit,
  onDrop,
  onDropAccepted,
  onDropRejected,
  accept = ACCEPT_FILES,
}: UseDropzoneUpload): UseDropzoneUploadReturnType => {
  const parseFileData = (file: File) => {
    const { name, size, type, lastModified, webkitRelativePath } = file;

    return {
      id: getUUID(),
      name,
      size,
      type,
      lastModified,
      webkitRelativePath,
      blob: URL.createObjectURL(file),
      original: file,
    };
  };

  const rejectUpload = ({ acceptedFiles, rejectCode }: RejectUpload) => {
    const rejectedFiles = {
      files: acceptedFiles,
      code: rejectCode,
    };

    dispatch({
      type: DROPZONE_ACTION_MAPPER['SET_REJECT'],
      acceptedFiles,
      rejectedFiles,
    });
    onDropRejected?.({ rejectedFiles, state, dispatch });
    onDrop?.({
      acceptedFiles: [],
      rejectedFiles,
      state,
      dispatch,
    });

    console.error(`An error occurred in Dropzone. code: ${rejectCode}`);
  };

  const handleUpload = ({ files }: HandleUpload) => {
    const acceptedFiles = Array.from(
      files,
      parseFileData,
    ) as unknown as FileData[];

    if (!isMultiple && acceptedFiles.length > 1) {
      return rejectUpload({
        acceptedFiles,
        rejectCode: DROPZONE_REJECT_CODE_MAPPER['SINGLE_FILE_ONLY'],
      });
    }

    if (typeof limit !== 'undefined') {
      if (!isMultiple) {
        return rejectUpload({
          acceptedFiles,
          rejectCode:
            DROPZONE_REJECT_CODE_MAPPER['NEED_ACTIVE_MULTIPLE_OPTION'],
        });
      }

      if (acceptedFiles.length > limit) {
        return rejectUpload({
          acceptedFiles,
          rejectCode: DROPZONE_REJECT_CODE_MAPPER['TOO_MANY_FILES'],
        });
      }
    }

    const isRejectAccept = acceptedFiles.some((file) => {
      const acceptFileKeys: Array<keyof FileData> = ['type', 'name'];

      return acceptFileKeys.every(
        (acceptFileKey) =>
          !accept.some((acceptType) =>
            (file[acceptFileKey] as string).toLowerCase().includes(acceptType),
          ),
      );
    });

    if (isRejectAccept) {
      return rejectUpload({
        acceptedFiles,
        rejectCode: DROPZONE_REJECT_CODE_MAPPER['INVALID_FILE_FORMAT'],
      });
    }

    dispatch({ type: DROPZONE_ACTION_MAPPER['SET_FILES'], acceptedFiles });
    onDropAccepted?.({ acceptedFiles, state, dispatch });
    onDrop?.({
      acceptedFiles,
      state,
      dispatch,
    });
  };

  const resetFiles = () => {
    revokeFile({ url: uploadedFiles.map((file) => file['blob']) });

    dispatch({ type: DROPZONE_ACTION_MAPPER['RESET_FILES'] });
  };

  const deleteFile = ({ id }: Pick<FileData, 'id'>) => {
    dispatch({ type: DROPZONE_ACTION_MAPPER['DELETE_FILE'], id });
  };

  return { handleUpload, deleteFile, resetFiles };
};

export default useDropzoneUpload;
