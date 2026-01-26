import { FileData } from '@bbodek/hooks';
import { ImageProps } from 'next/image';
import { Dispatch, HTMLAttributes, SetStateAction } from 'react';

import {
  PreviewMultiControlsPrimitiveProps,
  PreviewMultiFile,
  PreviewMultiPrimitiveProps,
} from '@/components/Preview/shared/types';

export interface PreviewThumbnailsProps
  extends Pick<PreviewMultiPrimitiveProps, 'isLoading'>,
    PreviewMultiControlsPrimitiveProps,
    Pick<HTMLAttributes<HTMLUListElement>, 'className'> {}

export interface PreviewThumbnailProps
  extends Omit<PreviewThumbnailsProps, 'files' | 'currentFile'> {
  file: PreviewMultiFile;
  isCurrent: boolean;
}

export interface PreviewThumbnailViewerProps {
  file: FileData;
}

export interface PreviewThumbnailImageProps extends Pick<ImageProps, 'src'> {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export interface PreviewThumbnailPdfProps
  extends Pick<PreviewThumbnailImageProps, 'setIsLoading'> {
  file: File;
}
