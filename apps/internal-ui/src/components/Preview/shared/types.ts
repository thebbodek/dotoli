import { PreviewMultiProps } from '@/components/Preview/PreviewMulti';
import {
  PreviewFileData,
  PreviewProps,
} from '@/components/Preview/shared/components/Preview/types';
import { UsePreviewMultiReturnType } from '@/components/Preview/shared/hooks/usePreviewMulti/types';

export type PreviewMultiFile = Pick<PreviewProps, 'badge'> & PreviewFileData;

export interface PreviewMultiPrimitiveProps
  extends Pick<PreviewProps, 'isLoading' | 'className' | 'closeOption'> {
  files: PreviewMultiFile[];
  initialFile?: PreviewMultiFile;
}

export interface PreviewMultiControlsPrimitiveProps
  extends Pick<PreviewMultiProps, 'files'>,
    Pick<UsePreviewMultiReturnType['operations'], 'onChange'> {
  previewId: string;
  currentFile: PreviewMultiFile | null;
  disabled?: boolean;
}
