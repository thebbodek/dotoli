import { UsePreviewMultiReturnType } from '@/components/Preview/shared/hooks/usePreviewMulti/types';
import {
  PreviewMultiFile,
  PreviewMultiPrimitiveProps,
} from '@/components/Preview/shared/types';

export interface UsePreviewMultiInitialFileEffectParams
  extends Pick<PreviewMultiPrimitiveProps, 'files'>,
    Pick<UsePreviewMultiReturnType['operations'], 'onChange'> {
  initialFile?: PreviewMultiFile;
}
