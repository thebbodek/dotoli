import { PreviewMultiFile } from '@/components/Preview/shared';

export interface PreviewMultiOnChangeParams {
  file: PreviewMultiFile;
}

export interface UsePreviewMultiReturnType {
  models: {
    previewId: string;
    currentFile: PreviewMultiFile | null;
  };
  operations: {
    onChange: ({ file }: PreviewMultiOnChangeParams) => void;
  };
}
