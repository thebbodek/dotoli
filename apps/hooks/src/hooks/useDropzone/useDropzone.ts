import { ACCEPT_FILES } from '@bbodek/utils';

import useDropzoneFilesCleanupEffect from '@/hooks/useDropzone/effects/useDropzoneFilesCleanupEffect';
import useDropzonePropsErrorEffect from '@/hooks/useDropzone/effects/useDropzonePropsErrorEffect';
import { UseDropzone, UseDropzoneReturn } from '@/hooks/useDropzone/types';
import useDropzoneInput from '@/hooks/useDropzone/useDropzoneInput';
import useDropzoneReducer from '@/hooks/useDropzone/useDropzoneReducer';
import useDropzoneRoot from '@/hooks/useDropzone/useDropzoneRoot';
import useDropzoneUpload from '@/hooks/useDropzone/useDropzoneUpload';

const useDropzone = (props: UseDropzone): UseDropzoneReturn => {
  const {
    multiple = true,
    limit,
    disabled = false,
    onDrop,
    onDropAccepted,
    onDropRejected,
    accept = ACCEPT_FILES,
    max,
  } = props;
  const { state, dispatch } = useDropzoneReducer();
  const { handleUpload, deleteFile, resetFiles } = useDropzoneUpload({
    uploadedFiles: state['acceptedFiles'],
    state,
    dispatch,
    multiple,
    limit,
    onDrop,
    onDropAccepted,
    onDropRejected,
    accept,
    max,
  });
  const { inputProps, inputRef } = useDropzoneInput({
    disabled,
    handleUpload,
    multiple,
    accept,
  });
  const { rootProps } = useDropzoneRoot({
    inputRef,
    dispatch,
    disabled,
    handleUpload,
  });

  useDropzoneFilesCleanupEffect({ acceptedFiles: state['acceptedFiles'] });
  useDropzonePropsErrorEffect({ multiple, limit });

  return { state, deleteFile, resetFiles, rootProps, inputProps, dispatch };
};

export default useDropzone;
