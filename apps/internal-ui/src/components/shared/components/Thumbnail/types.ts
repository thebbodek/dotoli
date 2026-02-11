import { ImageProps } from 'next/image';
import { Dispatch, SetStateAction } from 'react';

import { ImageErrorBoundaryProps } from '@/components/shared/components/ImageErrorBoundary';

export interface ThumbnailImageProps
  extends Pick<ImageProps, 'src' | 'alt'>,
    Pick<ImageErrorBoundaryProps, 'errorComponent'> {
  size: number;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export interface ThumbnailPdfProps extends Omit<ThumbnailImageProps, 'src'> {
  file: File;
}
