import { ACCEPT_FILES, getUUID } from '@bbodek/utils';

import {
  DROPZONE_ACTION_MAPPER,
  DROPZONE_REJECT_CODE_MAPPER,
  FILE_DEFAULT_MAX_SIZE,
} from '@/hooks/useDropzone/constants';
import {
  DropzoneState,
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
  multiple = true,
  limit,
  onDrop,
  onDropAccepted,
  onDropRejected,
  accept = ACCEPT_FILES,
  max = FILE_DEFAULT_MAX_SIZE,
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
    } as FileData;
  };

  const rejectUpload = ({ acceptedFiles, rejectCode }: RejectUpload) => {
    const rejectedFiles = { files: acceptedFiles, code: rejectCode };

    dispatch({
      type: DROPZONE_ACTION_MAPPER.SET_REJECT,
      acceptedFiles,
      rejectedFiles,
    });
    onDropRejected?.({ rejectedFiles, state, dispatch });
    onDrop?.({ acceptedFiles: [], rejectedFiles, state, dispatch });

    console.error(`An error occurred in Dropzone. code: ${rejectCode}`);
  };

  const getRejectCode = ({
    acceptedFiles,
  }: Pick<DropzoneState, 'acceptedFiles'>) => {
    const hasLimit = typeof limit !== 'undefined';
    const isRejectLimit = hasLimit && acceptedFiles.length > limit;
    const isRejectMultiple = !multiple && acceptedFiles.length > 1;

    if (isRejectLimit || isRejectMultiple) {
      return DROPZONE_REJECT_CODE_MAPPER.TOO_MANY_FILES;
    }

    const isRejectSize = acceptedFiles.some(
      (file) => file.size > 1024 * 1024 * max,
    );

    if (isRejectSize) {
      return DROPZONE_REJECT_CODE_MAPPER.TOO_LARGE_FILE;
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
      return DROPZONE_REJECT_CODE_MAPPER.INVALID_FILE_FORMAT;
    }

    return null;
  };

  const handleUpload = ({ files }: HandleUpload) => {
    const acceptedFiles = Array.from(files, parseFileData);
    const rejectCode = getRejectCode({ acceptedFiles });

    if (rejectCode) {
      return rejectUpload({ acceptedFiles, rejectCode });
    }

    dispatch({ type: DROPZONE_ACTION_MAPPER.SET_FILES, acceptedFiles });
    onDropAccepted?.({ acceptedFiles, state, dispatch });
    onDrop?.({
      acceptedFiles,
      state,
      dispatch,
    });
  };

  const resetFiles = () => {
    revokeFile({ url: uploadedFiles.map((file) => file.blob) });

    dispatch({ type: DROPZONE_ACTION_MAPPER.RESET_FILES });
  };

  const deleteFile = ({ id }: Pick<FileData, 'id'>) => {
    dispatch({ type: DROPZONE_ACTION_MAPPER.DELETE_FILE, id });
  };

  return { handleUpload, deleteFile, resetFiles };
};

export default useDropzoneUpload;
