import { useReducer } from 'react';

import { DROPZONE_ACTION_MAPPER } from '@/hooks/useDropzone/constants';
import {
  DropzoneAction,
  DropzoneState,
  UseDropzoneReducerReturnType,
} from '@/hooks/useDropzone/types';

const initialState: DropzoneState = {
  isDragActive: false,
  isHover: false,
  isActive: false,
  acceptedFiles: [],
  rejectedFiles: undefined,
};

const dropZoneReducer = (
  state: DropzoneState,
  action: DropzoneAction,
): DropzoneState => {
  switch (action.type) {
    case DROPZONE_ACTION_MAPPER['DRAG']:
      return {
        ...state,
        isDragActive: action['isDragActive'] ?? state['isDragActive'],
        isActive: action['isDragActive'] ?? state['isDragActive'],
      };
    case DROPZONE_ACTION_MAPPER['HOVER']:
      return {
        ...state,
        isHover: action['isHover'] ?? state['isHover'],
        isActive: action['isHover'] ?? state['isHover'],
      };
    case DROPZONE_ACTION_MAPPER['SET_FILES']:
      return {
        ...state,
        acceptedFiles: action['acceptedFiles'] ?? state['acceptedFiles'],
        rejectedFiles: undefined,
        isDragActive: false,
        isHover: false,
        isActive: false,
      };
    case DROPZONE_ACTION_MAPPER['SET_REJECT']:
      return {
        ...state,
        rejectedFiles: action['rejectedFiles'] ?? state['rejectedFiles'],
        isDragActive: false,
        isHover: false,
        isActive: false,
      };
    case DROPZONE_ACTION_MAPPER['DELETE_FILE']:
      return {
        ...state,
        acceptedFiles: state['acceptedFiles'].filter(
          (file) => file['id'] !== action['id'],
        ),
      };
    case DROPZONE_ACTION_MAPPER['RESET_FILES']:
      return {
        ...state,
        acceptedFiles: [],
      };
    default:
      return state;
  }
};

const useDropzoneReducer = (): UseDropzoneReducerReturnType => {
  const [state, dispatch] = useReducer(dropZoneReducer, initialState);

  return { state, dispatch };
};

export default useDropzoneReducer;
