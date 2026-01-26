import { FileData } from '@bbodek/hooks';
import { FileDownloadParams } from '@bbodek/utils';
import { ImageProps } from 'next/image';
import { HTMLAttributes, ReactElement } from 'react';

import { BadgeProps, BadgeVariant } from '@/components/Badge';
import { IconButtonProps } from '@/components/Button';
import { IconProps } from '@/components/Icon';
import { UsePreviewReturnType } from '@/components/Preview/shared/components/Preview/hooks';
import { UsePreviewImageReturnType } from '@/components/Preview/shared/hooks/usePreviewImage';
import { ConvertUrlToFileDataParams } from '@/components/Preview/utils';
import { ImageErrorBoundaryProps, NonNullableType } from '@/components/shared';

export type PreviewFileData =
  | FileData
  | (Pick<FileData, 'id' | 'name' | 'type'> &
      Pick<ConvertUrlToFileDataParams, 'url'>);

export interface PreviewProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className' | 'id'> {
  file: PreviewFileData | null;
  badge?: ReactElement<BadgeProps<BadgeVariant>>;
  isLoading?: boolean;
  closeOption: Partial<Pick<IconButtonProps, 'aria-label'>> & {
    onClose: () => void;
    iconKey?: Extract<IconProps['iconKey'], 'x' | 'caret-line-left'>;
  };
}

export interface PreviewWrapperProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className' | 'aria-expanded'> {}

export interface PreviewHeaderProps
  extends Pick<PreviewProps, 'badge' | 'closeOption'>,
    Pick<HTMLAttributes<HTMLElement>, 'className'> {
  titleId: string;
  fileName: string;
}

export interface PreviewViewerProps
  extends Pick<PreviewProps, 'file' | 'isLoading'>,
    Pick<UsePreviewReturnType['models'], 'viewerSize' | 'previewOptions'> {}

export interface PreviewViewerPrimitiveProps
  extends Pick<PreviewViewerProps, 'previewOptions'>,
    NonNullableType<Pick<PreviewViewerProps, 'viewerSize'>> {
  file: FileData;
}

export interface PreviewImageProps
  extends Pick<ImageProps, 'onLoad' | 'onError' | 'className'>,
    Pick<PreviewViewerPrimitiveProps, 'viewerSize' | 'previewOptions'>,
    Pick<ImageErrorBoundaryProps, 'isError'>,
    PreviewNotSupportProps {
  src: string;
  size: { width?: number; height?: number };
}

export interface PreviewImageViewerProps extends PreviewViewerPrimitiveProps {}

export interface PreviewPdfViewerProps extends PreviewViewerPrimitiveProps {}

export interface PreviewImageRendererProps {
  isLoading: boolean;
}

export interface PreviewImageSize {
  width: number;
  height: number;
}

export interface PreviewPdfViewerImageProps
  extends Pick<PreviewImageProps, 'src' | 'downloadOptions'>,
    Pick<PreviewPdfViewerProps, 'previewOptions' | 'viewerSize'>,
    Pick<UsePreviewImageReturnType['models'], 'imgSize'>,
    Pick<UsePreviewImageReturnType['status'], 'isError'>,
    Pick<UsePreviewImageReturnType['operations'], 'onLoadImage' | 'onError'> {}

export interface PreviewNotSupportProps {
  downloadOptions: FileDownloadParams;
}

export interface PreviewToolbarProps
  extends Pick<PreviewViewerProps, 'file'>,
    Pick<UsePreviewReturnType['models'], 'previewOptions'>,
    Pick<UsePreviewReturnType['operations'], 'setPreviewOptions'>,
    Pick<HTMLAttributes<HTMLElement>, 'className'> {}
